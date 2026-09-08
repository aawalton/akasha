import {
  ASLEEP_VALUES,
  type HealthExport,
  type HealthMetric,
  type HealthRecord,
} from "../health-export/health-export.module.code.ts"

export const SNAPSHOT_METRICS: readonly HealthMetric[] = [
  "hrv",
  "restingHeartRate",
  "oxygenSaturation",
  "stepCount",
  "sleep",
]

export interface MetricSummary {
  readonly metric: HealthMetric
  readonly label: string
  readonly unit: string
  readonly latest: number | undefined
  readonly latestDay: string | undefined
  readonly mean: number | undefined
  readonly min: number | undefined
  readonly max: number | undefined
  readonly n: number
  readonly nLabel: string
}

export interface HealthSnapshot {
  readonly sourceFile: string | null
  readonly exportedAtMs: number | undefined
  readonly windowDays: number
  readonly metrics: readonly MetricSummary[]
  readonly skipped: number
}

interface Stats {
  readonly mean: number | undefined
  readonly min: number | undefined
  readonly max: number | undefined
}

function stats(values: readonly number[]): Stats {
  if (values.length === 0) return { mean: undefined, min: undefined, max: undefined }
  let sum = 0
  let min = values[0] ?? 0
  let max = values[0] ?? 0
  for (const v of values) {
    sum += v
    if (v < min) min = v
    if (v > max) max = v
  }
  return { mean: sum / values.length, min, max }
}

function quantitySummary(
  records: readonly HealthRecord[],
  metric: HealthMetric,
  label: string,
  unit: string,
  scale: number
): MetricSummary {
  const points = records
    .filter((r) => r.metric === metric)
    .map((r) => ({ ms: r.startMs, day: r.startDay, value: Number(r.value) * scale }))
    .filter((p) => Number.isFinite(p.value))
  const latestPoint = points.reduce<(typeof points)[number] | undefined>(
    (best, p) => (best === undefined || p.ms > best.ms ? p : best),
    undefined
  )
  const s = stats(points.map((p) => p.value))
  return {
    metric,
    label,
    unit,
    latest: latestPoint?.value,
    latestDay: latestPoint?.day,
    ...s,
    n: points.length,
    nLabel: "samples",
  }
}

function sumByDay(
  records: readonly HealthRecord[],
  metric: HealthMetric,
  dayOf: (r: HealthRecord) => string,
  amountOf: (r: HealthRecord) => number
): Map<string, number> {
  const byDay = new Map<string, number>()
  for (const r of records) {
    if (r.metric !== metric) continue
    const amount = amountOf(r)
    if (!Number.isFinite(amount)) continue
    const day = dayOf(r)
    byDay.set(day, (byDay.get(day) ?? 0) + amount)
  }
  return byDay
}

function dailyTotalSummary(
  records: readonly HealthRecord[],
  metric: HealthMetric,
  label: string,
  unit: string
): MetricSummary {
  const byDay = sumByDay(
    records,
    metric,
    (r) => r.startDay,
    (r) => Number(r.value)
  )
  return aggregateByDay(byDay, metric, label, unit, "days")
}

function sleepSummary(records: readonly HealthRecord[], label: string): MetricSummary {
  const byDay = sumByDay(
    records,
    "sleep",
    (r) => r.endDay,
    (r) => (ASLEEP_VALUES.has(r.value) ? (r.endMs - r.startMs) / 3_600_000 : Number.NaN)
  )
  return aggregateByDay(byDay, "sleep", label, "h", "nights")
}

function aggregateByDay(
  byDay: ReadonlyMap<string, number>,
  metric: HealthMetric,
  label: string,
  unit: string,
  nLabel: string
): MetricSummary {
  const days = [...byDay.keys()].sort()
  const latestDay = days.at(-1)
  const s = stats([...byDay.values()])
  return {
    metric,
    label,
    unit,
    latest: latestDay === undefined ? undefined : byDay.get(latestDay),
    latestDay,
    ...s,
    n: byDay.size,
    nLabel,
  }
}

export function summarizeSnapshot(
  exported: HealthExport,
  windowDays: number,
  nowMs: number
): HealthSnapshot {
  const cutoff = nowMs - windowDays * 86_400_000
  const recent = exported.records.filter((r) => r.startMs >= cutoff)
  const metrics: readonly MetricSummary[] = [
    quantitySummary(recent, "hrv", "HRV (SDNN)", "ms", 1),
    quantitySummary(recent, "restingHeartRate", "Resting heart rate", "bpm", 1),
    quantitySummary(recent, "oxygenSaturation", "Blood oxygen", "%", 100),
    dailyTotalSummary(recent, "stepCount", "Steps", ""),
    sleepSummary(recent, "Sleep (asleep)"),
  ]
  return {
    sourceFile: exported.sourceFile,
    exportedAtMs: exported.exportedAtMs,
    windowDays,
    metrics,
    skipped: exported.skipped,
  }
}

function round(value: number | undefined, places: number): string {
  if (value === undefined) return "—"
  const factor = 10 ** places
  return String(Math.round(value * factor) / factor)
}

function placesFor(metric: HealthMetric): number {
  return metric === "hrv" || metric === "sleep" ? 1 : 0
}

function isoMinute(ms: number | undefined): string {
  if (ms === undefined) return "unknown"
  return new Date(ms).toISOString().slice(0, 16).replace("T", " ")
}

export function formatSnapshot(snapshot: HealthSnapshot): string {
  const lines: string[] = []
  const source = snapshot.sourceFile ?? "unknown"
  lines.push(
    `Apple Health snapshot — exported ${isoMinute(snapshot.exportedAtMs)} UTC (source: ${source})`
  )
  lines.push(`window: last ${snapshot.windowDays} days`)
  lines.push("")
  for (const m of snapshot.metrics) {
    const p = placesFor(m.metric)
    const unit = m.unit === "" ? "" : ` ${m.unit}`
    const latest = m.latest === undefined ? "no recent data" : `${round(m.latest, p)}${unit}`
    const when = m.latestDay ?? ""
    const trend =
      m.n === 0
        ? ""
        : `   ${snapshot.windowDays}d avg ${round(m.mean, p)}  min ${round(m.min, p)}  max ${round(m.max, p)}  n=${m.n} ${m.nLabel}`
    lines.push(`${m.label.padEnd(22)} latest ${latest}${when === "" ? "" : `  (${when})`}${trend}`)
  }
  if (snapshot.skipped > 0)
    lines.push("", `(${snapshot.skipped} record line(s) skipped as unparseable)`)
  return `${lines.join("\n")}\n`
}
