import { upsertHealthSamples } from "@akasha/health-samples-access/sample-upsert"
import { buildFetchScript } from "@akasha/health-samples-import/health-export"
import { IMPORT_METRICS } from "@akasha/health-samples-import/health-import"
import { importReading } from "@akasha/health-samples-import/health-import-reading"
import {
  type ImportOutcome,
  type ImportRunDeps,
  MAX_IMPORT_BATCH,
  NO_LOWER_BOUND,
  runHealthImport,
} from "@akasha/health-samples-import/health-import-run"
import { MACBOOK } from "@akasha/health-samples-import/laptop-host"
import { streamSshLines } from "@akasha/ssh-access/ssh-reach"
import type { Answer } from "../../command-system/calling/calling.module.code.ts"
import { refused } from "../../command-system/calling/calling.module.code.ts"
import { saidBy } from "../../command-system/fault-saying/fault-saying.module.code.ts"

const INPUT = 1

const DATA = 2

const OPERATIONAL = 3

const NOTHING = "—"

export const HEALTH = "health"

const PATH = "--path"

const SINCE = "--since"

const BATCH = "--batch"

const DRY_RUN = "--dry-run"

const RESTART = "--restart"

const VALUED = [PATH, SINCE, BATCH]

const BARE = [DRY_RUN, RESTART]

const CIVIL_DAY = /^\d{4}-\d{2}-\d{2}$/

const NO_EXPORT =
  "no Apple Health export is on the macbook. On your iPhone, open Health, tap your profile photo, " +
  "then Export All Health Data, and put the zip in the Mac's ~/Downloads — or name one with `--path`."

const TAKEN_UP =
  "what already landed is written, and a call made again takes the run up where it ended unless `--restart` is said"

export type Taken = {
  readonly path: string | undefined
  readonly since: string
  readonly batch: number
  readonly dryRun: boolean
  readonly restart: boolean
}

export type Reading = Taken | { readonly refused: string }

export function taken(argv: readonly string[]): Reading {
  const held = new Map<string, string>()
  const bare = new Set<string>()
  let at = 0
  while (at < argv.length) {
    const one = argv[at] as string
    at += 1
    if (BARE.includes(one)) {
      bare.add(one)
      continue
    }
    if (!one.startsWith("-")) {
      return {
        refused: `\`akasha importing\` brings in one subject, and \`${one}\` is named after \`${HEALTH}\``,
      }
    }
    const named = VALUED.find((each) => one === each || one.startsWith(`${each}=`))
    if (named === undefined) {
      return { refused: `\`${one}\` is nothing \`akasha importing ${HEALTH}\` takes` }
    }
    let value: string | undefined
    if (one === named) {
      value = argv[at]
      at += 1
    } else {
      value = one.slice(named.length + 1)
    }
    if (value === undefined || value === "" || value.startsWith("-")) {
      return { refused: `\`${named}\` takes a value, and this call names none after it` }
    }
    const before = held.get(named)
    if (before !== undefined) {
      return {
        refused: `\`${named}\` is named twice, as \`${before}\` and as \`${value}\`, so which is meant is unsettled`,
      }
    }
    held.set(named, value)
  }
  const since = held.get(SINCE)
  if (since !== undefined && !CIVIL_DAY.test(since)) {
    return {
      refused: `\`${SINCE}\` takes a civil day written YYYY-MM-DD, and this call names \`${since}\``,
    }
  }
  const said = held.get(BATCH)
  const batch = said === undefined ? MAX_IMPORT_BATCH : Number(said)
  if (!Number.isInteger(batch) || batch < 1 || batch > MAX_IMPORT_BATCH) {
    return {
      refused: `\`${BATCH}\` takes a whole number from 1 to ${MAX_IMPORT_BATCH}, and this call names \`${said}\``,
    }
  }
  return {
    path: held.get(PATH),
    since: since ?? NO_LOWER_BOUND,
    batch,
    dryRun: bare.has(DRY_RUN),
    restart: bare.has(RESTART),
  }
}

export function minuteOf(ms: number | undefined): string {
  return ms === undefined ? NOTHING : new Date(ms).toISOString().slice(0, 16).replace("T", " ")
}

export function linesOf(outcome: ImportOutcome, dryRun: boolean): readonly string[] {
  const said: string[] = [
    `import\t${HEALTH}\t${outcome.sourceFile ?? NOTHING}`,
    `exported\t${minuteOf(outcome.exportedAtMs)} UTC`,
  ]
  if (outcome.resumedFrom > 0) said.push(`resumed\tafter record line ${outcome.resumedFrom}`)
  for (const [metric, held] of Object.entries(outcome.perMetric)) {
    said.push(
      `${metric}\t${held.count} records\tearliest ${minuteOf(held.earliestMs)}\tlatest ${minuteOf(held.latestMs)}`
    )
  }
  said.push(`record lines\t${outcome.tally.recordLines}`)
  said.push(`converted\t${outcome.tally.converted}`)
  if (outcome.tally.unparseable > 0) said.push(`unparseable\t${outcome.tally.unparseable}`)
  if (outcome.tally.sourceDefaulted > 0) {
    said.push(`unattributed\t${outcome.tally.sourceDefaulted}`)
  }
  for (const [why, many] of Object.entries(outcome.tally.rejected)) {
    if (many > 0) said.push(`refused\t${why}\t${many}`)
  }
  if (dryRun) {
    said.push("dry-run\tnothing was written; run it again without `--dry-run` to carry it out")
    return said
  }
  said.push(`batches\t${outcome.batches}`)
  said.push(`inserted\t${outcome.write.inserted}`)
  said.push(`already filed\t${outcome.write.unchanged}`)
  if (outcome.write.valueChanged > 0) said.push(`value moved\t${outcome.write.valueChanged}`)
  return said
}

export function readingLines(
  outcome: ImportOutcome,
  dryRun: boolean,
  atMs: number
): readonly string[] {
  const read = importReading(outcome, { dryRun, observedAtMs: atMs })
  const said = [`reading\t${read.state}\t${read.reason}`]
  for (const one of read.findings) {
    said.push(one.at === null ? `finding\t${one.detail}` : `finding\t${one.at}\t${one.detail}`)
  }
  return said
}

export async function healthImported(
  held: Taken,
  deps: ImportRunDeps,
  atMs: number
): Promise<Answer> {
  let outcome: ImportOutcome
  try {
    outcome = await runHealthImport(
      {
        sinceDay: held.since,
        batchSize: held.batch,
        dryRun: held.dryRun,
        restart: held.restart,
        onProgress: () => undefined,
      },
      deps
    )
  } catch (thrown) {
    return { report: [], refusals: [saidBy(thrown), TAKEN_UP], code: OPERATIONAL }
  }
  if (outcome.sourceFile === null) return refused(NO_EXPORT, DATA)
  return {
    report: [...linesOf(outcome, held.dryRun), ...readingLines(outcome, held.dryRun, atMs)],
    refusals: [],
    code: 0,
  }
}

export function reaching(held: Taken): ImportRunDeps {
  const script = buildFetchScript({
    path: held.path,
    sinceDay: held.since,
    metrics: IMPORT_METRICS,
  })
  return {
    openStream: () => streamSshLines(MACBOOK, script),
    writeBatch: async (samples) => {
      if (held.dryRun) throw new Error("a dry run reached the writer, which writes nothing")
      return await upsertHealthSamples({ samples })
    },
  }
}

export async function importing(argv: readonly string[]): Promise<Answer> {
  const subject = argv[0]
  if (subject === undefined) {
    return refused(`\`akasha importing\` takes a subject, which is \`${HEALTH}\``, INPUT)
  }
  if (subject !== HEALTH) {
    return refused(
      `\`${subject}\` is nothing \`akasha importing\` brings in, which is \`${HEALTH}\``,
      INPUT
    )
  }
  const held = taken(argv.slice(1))
  if ("refused" in held) return refused(held.refused, INPUT)
  return await healthImported(held, reaching(held), Date.now())
}
