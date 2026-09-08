import type {
  HealthSample,
  HealthSampleWriteReport,
  HealthMetric as StoredMetric,
} from "@akasha/health-samples-access/sample-shape"
import { parseExportDateLine, parseRecordLine } from "../health-export/health-export.module.code.ts"
import {
  countConversion,
  emptyTally,
  IMPORT_METRICS,
  type ImportTally,
  toHealthSample,
} from "../health-import/health-import.module.code.ts"
import {
  checkpointKey,
  clearCheckpoint,
  readCheckpoint,
  writeCheckpoint,
} from "../health-import-checkpoint/health-import-checkpoint.module.code.ts"

export const MAX_IMPORT_BATCH = 1000

export const NO_LOWER_BOUND = "0001-01-01"

export interface MetricStats {
  count: number
  earliestMs: number | undefined
  latestMs: number | undefined
}

export interface ImportProgress {
  readonly batches: number
  readonly recordLines: number
  readonly samplesWritten: number
}

export interface ImportRunOptions {
  readonly sinceDay: string
  readonly batchSize: number
  readonly dryRun: boolean
  readonly restart: boolean
  readonly onProgress: (progress: ImportProgress) => undefined
  readonly cacheDir?: string
}

export interface ImportRunDeps {
  readonly openStream: () => AsyncIterable<string>
  readonly writeBatch: (samples: readonly HealthSample[]) => Promise<HealthSampleWriteReport>
}

export interface ImportOutcome {
  readonly sourceFile: string | null
  readonly exportedAtMs: number | undefined
  readonly tally: ImportTally
  readonly perMetric: Readonly<Record<StoredMetric, MetricStats>>
  readonly write: HealthSampleWriteReport
  readonly batches: number
  readonly samplesWritten: number
  readonly resumedFrom: number
}

function emptyStats(): Record<StoredMetric, MetricStats> {
  return {
    activeEnergy: { count: 0, earliestMs: undefined, latestMs: undefined },
    stepCount: { count: 0, earliestMs: undefined, latestMs: undefined },
  }
}

function noteSample(stats: MetricStats, sample: HealthSample): undefined {
  const ms = Date.parse(sample.startedAt)
  stats.count += 1
  if (stats.earliestMs === undefined || ms < stats.earliestMs) stats.earliestMs = ms
  if (stats.latestMs === undefined || ms > stats.latestMs) stats.latestMs = ms
  return undefined
}

function addReport(
  into: HealthSampleWriteReport,
  from: HealthSampleWriteReport
): HealthSampleWriteReport {
  return {
    received: into.received + from.received,
    distinct: into.distinct + from.distinct,
    inserted: into.inserted + from.inserted,
    unchanged: into.unchanged + from.unchanged,
    valueChanged: into.valueChanged + from.valueChanged,
  }
}

const EMPTY_WRITE: HealthSampleWriteReport = {
  received: 0,
  distinct: 0,
  inserted: 0,
  unchanged: 0,
  valueChanged: 0,
}

export async function runHealthImport(
  opts: ImportRunOptions,
  deps: ImportRunDeps
): Promise<ImportOutcome> {
  const tally = emptyTally()
  const perMetric = emptyStats()

  let sourceFile: string | null = null
  let exportedAtMs: number | undefined
  let sawHeader = false
  let key: string | undefined
  let skipUntilLine = 0
  let resumedFrom = 0

  let buffer: HealthSample[] = []
  let batches = 0
  let samplesWritten = 0
  let write = EMPTY_WRITE

  const flush = async (): Promise<void> => {
    if (buffer.length === 0) return
    if (!opts.dryRun) {
      const report = await deps.writeBatch(buffer)
      write = addReport(write, report)
    }
    samplesWritten += buffer.length
    batches += 1
    buffer = []
    if (!opts.dryRun && key !== undefined) {
      await writeCheckpoint(
        key,
        {
          sourceFile: sourceFile ?? "",
          ...(exportedAtMs === undefined ? {} : { exportedAtMs }),
          sinceDay: opts.sinceDay,
          metrics: [...IMPORT_METRICS],
          recordLinesCommitted: tally.recordLines,
          samplesWritten,
          updatedAt: new Date().toISOString(),
        },
        opts.cacheDir
      )
    }
    opts.onProgress({ batches, recordLines: tally.recordLines, samplesWritten })
  }

  for await (const line of deps.openStream()) {
    if (!sawHeader) {
      sawHeader = true
      const head = line.trim()
      if (head === "NOFILE" || head === "") break
      sourceFile = head.startsWith("FILE\t") ? head.slice("FILE\t".length) : null
      continue
    }

    if (line.includes("<ExportDate ")) {
      exportedAtMs = parseExportDateLine(line) ?? exportedAtMs
      continue
    }
    if (!line.includes("<Record ")) continue

    if (key === undefined) {
      key = checkpointKey({
        sourceFile: sourceFile ?? "",
        exportedAtMs,
        sinceDay: opts.sinceDay,
        metrics: IMPORT_METRICS,
      })
      if (!opts.restart && !opts.dryRun) {
        const prior = await readCheckpoint(key, opts.cacheDir)
        if (prior !== undefined) {
          skipUntilLine = prior.recordLinesCommitted
          resumedFrom = prior.recordLinesCommitted
        }
      }
    }

    tally.recordLines += 1
    const record = parseRecordLine(line)
    if (record === undefined) {
      tally.unparseable += 1
      continue
    }
    const conversion = toHealthSample(record)
    countConversion(tally, conversion)
    if (!conversion.ok) continue
    noteSample(perMetric[conversion.sample.metric], conversion.sample)

    if (tally.recordLines <= skipUntilLine) continue
    buffer.push(conversion.sample)
    if (buffer.length >= opts.batchSize) await flush()
  }

  await flush()
  if (!opts.dryRun && key !== undefined) await clearCheckpoint(key, opts.cacheDir)

  return {
    sourceFile,
    exportedAtMs,
    tally,
    perMetric,
    write,
    batches,
    samplesWritten,
    resumedFrom,
  }
}
