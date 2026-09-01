import { z } from "zod"

export type HealthMetric =
  | "hrv"
  | "restingHeartRate"
  | "oxygenSaturation"
  | "stepCount"
  | "sleep"
  | "activeEnergy"

const TYPE_TO_METRIC: Record<string, HealthMetric> = {
  HKQuantityTypeIdentifierHeartRateVariabilitySDNN: "hrv",
  HKQuantityTypeIdentifierRestingHeartRate: "restingHeartRate",
  HKQuantityTypeIdentifierOxygenSaturation: "oxygenSaturation",
  HKQuantityTypeIdentifierStepCount: "stepCount",
  HKCategoryTypeIdentifierSleepAnalysis: "sleep",
  HKQuantityTypeIdentifierActiveEnergyBurned: "activeEnergy",
}

function identifiersFor(metrics: readonly HealthMetric[]): readonly string[] {
  const wanted = new Set<HealthMetric>(metrics)
  return Object.keys(TYPE_TO_METRIC).filter((id) => {
    const metric = TYPE_TO_METRIC[id]
    return metric !== undefined && wanted.has(metric)
  })
}

export const ASLEEP_VALUES: ReadonlySet<string> = new Set([
  "HKCategoryValueSleepAnalysisAsleepCore",
  "HKCategoryValueSleepAnalysisAsleepDeep",
  "HKCategoryValueSleepAnalysisAsleepREM",
  "HKCategoryValueSleepAnalysisAsleepUnspecified",
])

const APPLE_DATE = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2} [+-]\d{4}$/

const exportDateSchema = z.object({ value: z.string().regex(APPLE_DATE) }).passthrough()

const recordSchema = z
  .object({
    type: z.string(),
    value: z.string(),
    startDate: z.string().regex(APPLE_DATE),
    endDate: z.string().regex(APPLE_DATE),
    unit: z.string().optional(),
    sourceName: z.string().optional(),
  })
  .passthrough()

export interface HealthRecord {
  readonly metric: HealthMetric
  readonly startMs: number
  readonly endMs: number
  readonly startDay: string
  readonly endDay: string
  readonly unit: string | undefined
  readonly value: string
  readonly sourceName: string | undefined
}

export interface HealthExport {
  readonly sourceFile: string | null
  readonly exportedAtMs: number | undefined
  readonly records: readonly HealthRecord[]
  readonly skipped: number
}

function appleDateToMs(s: string): number | undefined {
  const iso = `${s.slice(0, 10)}T${s.slice(11, 19)}${s.slice(20, 23)}:${s.slice(23, 25)}`
  const ms = Date.parse(iso)
  return Number.isNaN(ms) ? undefined : ms
}

const NAMED_ENTITIES: Readonly<Record<string, string>> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
}

function decodeEntities(value: string): string {
  if (!value.includes("&")) return value
  return value.replace(/&(#\d+|#x[0-9a-fA-F]+|\w+);/g, (whole, body: string) => {
    if (body.startsWith("#x") || body.startsWith("#X")) {
      const code = Number.parseInt(body.slice(2), 16)
      return Number.isFinite(code) ? String.fromCodePoint(code) : whole
    }
    if (body.startsWith("#")) {
      const code = Number.parseInt(body.slice(1), 10)
      return Number.isFinite(code) ? String.fromCodePoint(code) : whole
    }
    return NAMED_ENTITIES[body] ?? whole
  })
}

function extractAttrs(line: string): Record<string, string> {
  const out: Record<string, string> = {}
  for (const m of line.matchAll(/(\w+)="([^"]*)"/g)) {
    const key = m[1]
    const val = m[2]
    if (key === undefined || val === undefined) continue
    out[key] = decodeEntities(val)
  }
  return out
}

export function parseRecordLine(line: string): HealthRecord | undefined {
  const parsed = recordSchema.safeParse(extractAttrs(line))
  if (!parsed.success) return undefined
  const raw = parsed.data
  const metric = TYPE_TO_METRIC[raw.type]
  if (metric === undefined) return undefined
  const startMs = appleDateToMs(raw.startDate)
  const endMs = appleDateToMs(raw.endDate)
  if (startMs === undefined || endMs === undefined) return undefined
  return {
    metric,
    startMs,
    endMs,
    startDay: raw.startDate.slice(0, 10),
    endDay: raw.endDate.slice(0, 10),
    unit: raw.unit,
    value: raw.value,
    sourceName: raw.sourceName,
  }
}

export function parseExportDateLine(line: string): number | undefined {
  const parsed = exportDateSchema.safeParse(extractAttrs(line))
  if (!parsed.success) return undefined
  return appleDateToMs(parsed.data.value)
}

export function parseHealthExport(stdout: string): HealthExport {
  const lines = stdout.split("\n")
  const first = lines[0]?.trim() ?? ""
  if (first === "NOFILE" || first === "") {
    return { sourceFile: null, exportedAtMs: undefined, records: [], skipped: 0 }
  }
  const sourceFile = first.startsWith("FILE\t") ? first.slice("FILE\t".length) : null

  let exportedAtMs: number | undefined
  const records: HealthRecord[] = []
  let skipped = 0
  for (const line of lines.slice(1)) {
    if (line.includes("<ExportDate ")) {
      exportedAtMs = parseExportDateLine(line) ?? exportedAtMs
      continue
    }
    if (!line.includes("<Record ")) continue
    const record = parseRecordLine(line)
    if (record === undefined) skipped += 1
    else records.push(record)
  }
  return { sourceFile, exportedAtMs, records, skipped }
}

export interface FetchScriptOptions {
  readonly path: string | undefined
  readonly sinceDay: string
  readonly metrics: readonly HealthMetric[]
}

export function buildAwkProgram(sinceDay: string, metrics: readonly HealthMetric[]): string {
  const typeMatch = identifiersFor(metrics)
    .map((t) => `/type="${t}"/`)
    .join("||")
  return [
    "/<ExportDate /{print;next}",
    `${typeMatch}{p=index($0,"startDate=\\"");if(p>0){d=substr($0,p+11,10);if(d>="${sinceDay}")print}}`,
  ].join("\n")
}

export function buildFetchScript(opts: FetchScriptOptions): string {
  const b64Awk = Buffer.from(buildAwkProgram(opts.sinceDay, opts.metrics), "utf8").toString(
    "base64"
  )
  const b64Path = Buffer.from(opts.path ?? "", "utf8").toString("base64")
  const decode = (b64: string): string =>
    `"$(printf %s '${b64}' | base64 -D 2>/dev/null || printf %s '${b64}' | base64 -d)"`
  return [
    "set -eu",
    `awkprog=${decode(b64Awk)}`,
    `pathArg=${decode(b64Path)}`,
    'if [ -n "$pathArg" ]; then',
    '  src="$pathArg"',
    "else",
    `  src="$(ls -t "$HOME"/Downloads/export*.zip 2>/dev/null | head -1 || true)"`,
    "fi",
    'if [ -z "$src" ] || [ ! -f "$src" ]; then echo "NOFILE"; exit 0; fi',
    'printf "FILE\\t%s\\n" "$src"',
    'case "$src" in',
    '  *.zip) unzip -p "$src" apple_health_export/export.xml 2>/dev/null ;;',
    '  *) cat "$src" ;;',
    'esac | awk "$awkprog"',
  ].join("\n")
}
