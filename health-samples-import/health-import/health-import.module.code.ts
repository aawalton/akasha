import {
  HEALTH_METRIC_UNIT,
  type HealthSample,
  type HealthMetric as StoredMetric,
} from "@akasha/health-samples-access/sample-shape"
import type { HealthMetric, HealthRecord } from "../health-export/health-export.module.code.ts"

export const IMPORT_METRICS: readonly HealthMetric[] = ["activeEnergy", "stepCount"]

const UNIT_ALIASES: Readonly<Record<StoredMetric, readonly string[]>> = {
  activeEnergy: ["Cal", "kcal"],
  stepCount: ["count"],
}

export const UNATTRIBUTED_SOURCE = "Unattributed"

export type ConversionRejection =
  | "metric-not-imported"
  | "unit-unrecognised"
  | "value-not-a-number"
  | "span-inverted"

export type SampleConversion =
  | { readonly ok: true; readonly sample: HealthSample; readonly sourceDefaulted: boolean }
  | { readonly ok: false; readonly reason: ConversionRejection }

function storedMetric(metric: HealthMetric): StoredMetric | undefined {
  return metric === "activeEnergy" || metric === "stepCount" ? metric : undefined
}

export function toHealthSample(record: HealthRecord): SampleConversion {
  const metric = storedMetric(record.metric)
  if (metric === undefined) return { ok: false, reason: "metric-not-imported" }

  const unit = record.unit ?? ""
  if (!UNIT_ALIASES[metric].includes(unit)) return { ok: false, reason: "unit-unrecognised" }

  const value = Number(record.value)
  if (!Number.isFinite(value) || value < 0) return { ok: false, reason: "value-not-a-number" }

  if (record.endMs < record.startMs) return { ok: false, reason: "span-inverted" }

  const sourceDefaulted = record.sourceName === undefined || record.sourceName === ""
  return {
    ok: true,
    sourceDefaulted,
    sample: {
      metric,
      startedAt: new Date(record.startMs).toISOString(),
      endedAt: new Date(record.endMs).toISOString(),
      value,
      unit: HEALTH_METRIC_UNIT[metric],
      sourceName: sourceDefaulted ? UNATTRIBUTED_SOURCE : (record.sourceName ?? ""),
    },
  }
}

export interface ImportTally {
  recordLines: number
  unparseable: number
  converted: number
  sourceDefaulted: number
  rejected: Record<ConversionRejection, number>
}

export function emptyTally(): ImportTally {
  return {
    recordLines: 0,
    unparseable: 0,
    converted: 0,
    sourceDefaulted: 0,
    rejected: {
      "metric-not-imported": 0,
      "unit-unrecognised": 0,
      "value-not-a-number": 0,
      "span-inverted": 0,
    },
  }
}

export function countConversion(tally: ImportTally, conversion: SampleConversion): undefined {
  if (conversion.ok) {
    tally.converted += 1
    if (conversion.sourceDefaulted) tally.sourceDefaulted += 1
    return undefined
  }
  tally.rejected[conversion.reason] += 1
  return undefined
}
