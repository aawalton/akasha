import { upsertHealthSamples } from "akasha/alan/harness/health-samples-access/sample-upsert/sample-upsert.module.code.ts"
import { streamExportLines } from "akasha/alan/harness/health-samples-import/export-fetching/export-fetching.module.code.ts"
import { buildFetchScript } from "akasha/alan/harness/health-samples-import/health-export/health-export.module.code.ts"
import { IMPORT_METRICS } from "akasha/alan/harness/health-samples-import/health-import/health-import.module.code.ts"
import { importReading } from "akasha/alan/harness/health-samples-import/health-import-reading/health-import-reading.module.code.ts"
import {
  type ImportOutcome,
  type ImportRunDeps,
  MAX_IMPORT_BATCH,
  NO_LOWER_BOUND,
  runHealthImport,
} from "akasha/alan/harness/health-samples-import/health-import-run/health-import-run.module.code.ts"
import {
  answering,
  DATA,
  INPUT,
  keeping,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { refused } from "akasha/commands/modules/calling/calling.module.code.ts"

const NOTHING = "—"

export const HEALTH = "health"

const FILE_PATH = "--file-path"

const SINCE = "--since"

const BATCH = "--batch"

const DRY_RUN = "--dry-run"

const RESTART = "--restart"

const VALUED = [FILE_PATH, SINCE, BATCH]

const BARE = [DRY_RUN, RESTART]

const CIVIL_DAY = /^\d{4}-\d{2}-\d{2}$/

export const NO_EXPORT =
  "no Apple Health export is on this workstation or on the macbook. On your iPhone, open Health, " +
  "tap your profile photo, then Export All Health Data, and put the zip in `~/Downloads` on either " +
  "machine — or name one with `--file-path`."

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

export function taken(argv: readonly string[], calledAs: string): Reading {
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
        refused: `\`${calledAs}\` takes flags alone, and \`${one}\` is named as a word of its own`,
      }
    }
    const named = VALUED.find((each) => one === each || one.startsWith(`${each}=`))
    if (named === undefined) {
      return { refused: `\`${one}\` is nothing \`${calledAs}\` takes` }
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
    path: held.get(FILE_PATH),
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

export function resumable(said: Answer): Answer {
  if (said.refusals.length === 0) return said
  if (said.report.length === 0 && said.refusals.includes(NO_EXPORT)) return said
  return { ...said, refusals: [...said.refusals, TAKEN_UP] }
}

export async function healthImported(
  held: Taken,
  deps: ImportRunDeps,
  atMs: number
): Promise<Answer> {
  return resumable(
    await answering(async (done) => {
      const outcome = await runHealthImport(
        {
          sinceDay: held.since,
          batchSize: held.batch,
          dryRun: held.dryRun,
          restart: held.restart,
          onProgress: () => undefined,
        },
        deps,
        done
      )
      if (outcome.sourceFile === null) return keeping(done, refused(NO_EXPORT, DATA))
      return told([...linesOf(outcome, held.dryRun), ...readingLines(outcome, held.dryRun, atMs)])
    })
  )
}

export function reaching(held: Taken): ImportRunDeps {
  const script = buildFetchScript({
    path: held.path,
    sinceDay: held.since,
    metrics: IMPORT_METRICS,
  })
  return {
    openStream: () => streamExportLines(script),
    writeBatch: async (samples) => {
      if (held.dryRun) throw new Error("a dry run reached the writer, which writes nothing")
      return await upsertHealthSamples({ samples })
    },
  }
}

export async function trackHealthImport(argv: readonly string[], given: Given): Promise<Answer> {
  const held = taken(argv, given.calledAs)
  if ("refused" in held) return refused(held.refused, INPUT)
  return await healthImported(held, reaching(held), Date.now())
}
