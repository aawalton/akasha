import { upsertHealthSamples } from "akasha/alan/harness/health-samples-access/sample-upsert/sample-upsert.module.code.ts"
import { streamExportLines } from "akasha/alan/harness/health-samples-import/export-fetching/export-fetching.module.code.ts"
import { buildFetchScript } from "akasha/alan/harness/health-samples-import/health-export/health-export.module.code.ts"
import { IMPORT_METRICS } from "akasha/alan/harness/health-samples-import/health-import/health-import.module.code.ts"
import { importReading } from "akasha/alan/harness/health-samples-import/health-import-reading/health-import-reading.module.code.ts"
import {
  type ImportOutcome,
  type ImportRunDeps,
  MAX_IMPORT_BATCH,
  runHealthImport,
} from "akasha/alan/harness/health-samples-import/health-import-run/health-import-run.module.code.ts"
import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { batch as batchArgument } from "akasha/commands/arguments/pages/batch.argument.ts"
import { dryRun as dryRunArgument } from "akasha/commands/arguments/pages/dry-run.argument.ts"
import { firstDay } from "akasha/commands/arguments/pages/first-day.argument.ts"
import { healthExportPath } from "akasha/commands/arguments/pages/health-export-path.argument.ts"
import { restart as restartArgument } from "akasha/commands/arguments/pages/restart.argument.ts"
import {
  answering,
  DATA,
  keeping,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { refused } from "akasha/commands/modules/calling/calling.module.code.ts"
import { trackHealthImport as page } from "akasha/commands/pages/track/health-import/track-health-import.command.ts"

const NOTHING = "—"

export const HEALTH = "health"

const CIVIL_DAY = /^\d{4}-\d{2}-\d{2}$/

export const NO_EXPORT =
  "no Apple Health export is on this workstation or on the macbook. On your iPhone, open Health, " +
  "tap your profile photo, then Export All Health Data, and put the zip in `~/Downloads` on either " +
  `machine — or name one with \`${healthExportPath.said}\`.`

const TAKEN_UP = `what already landed is written, and a call made again takes the run up where it ended unless \`${restartArgument.said}\` is said`

export type Taken = {
  readonly path: string | undefined
  readonly since: string
  readonly batch: number
  readonly dryRun: boolean
  readonly restart: boolean
}

export type Reading = Taken | { readonly refusals: readonly string[] }

export function taken(argv: readonly string[], calledAs: string): Reading {
  const read = takenFor(argv, calledAs, page, [
    dryRunArgument,
    healthExportPath,
    batchArgument,
    restartArgument,
    firstDay,
  ])
  if ("refused" in read) return { refusals: read.refused }
  const held = read.taken
  const refusals: string[] = []
  if (!CIVIL_DAY.test(held.firstDay)) {
    refusals.push(
      `\`${firstDay.said}\` takes a civil day written YYYY-MM-DD, and this call names \`${held.firstDay}\``
    )
  }
  if (held.batch < 1 || held.batch > MAX_IMPORT_BATCH) {
    refusals.push(
      `\`${batchArgument.said}\` takes a whole number from 1 to ${MAX_IMPORT_BATCH}, and this call names \`${held.batch}\``
    )
  }
  if (refusals.length > 0) return { refusals }
  return {
    path: held.healthExportPath,
    since: held.firstDay,
    batch: held.batch,
    dryRun: held.dryRun,
    restart: held.restart,
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
    said.push(
      `dry-run\tnothing was written; run it again without \`${dryRunArgument.said}\` to carry it out`
    )
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
  if ("refusals" in held) return refusedBy(held.refusals)
  return await healthImported(held, reaching(held), Date.now())
}
