import { existsSync, readFileSync } from "node:fs"
import { resolveRoots } from "@akasha/pages-system/checkout-roots"
import { instantMs } from "../sample-identity/sample-identity.module.code.ts"
import { ANCHOR_PAGE_TYPE, ROW_CEILING, recordOf } from "../sample-rows/sample-rows.module.code.ts"
import type { HealthMetric, HealthSampleRecord } from "../sample-shape/sample-shape.module.code.ts"

export const HEALTH_SAMPLE_PAGE_TYPE = "health-sample"

export const SAMPLE_ROWS_KEY = "health-samples"

const DAY_MS = 86400000

function checkoutRoot(): string {
  const roots = resolveRoots()
  const target = roots.target
  const at = target === undefined ? undefined : roots[target]
  if (at === undefined || at === "") {
    throw new Error("selectHealthSamples: nothing says which checkout the readings are kept in")
  }
  return at
}

export function sampleRowsAt(root: string, civilDay: string): string {
  return `${root}/pages/${ANCHOR_PAGE_TYPE}/${civilDay}.${ANCHOR_PAGE_TYPE}.${SAMPLE_ROWS_KEY}.jsonl`
}

function civilDayOf(ms: number): string {
  return new Date(ms).toISOString().slice(0, 10)
}

export async function selectHealthSamples(args: {
  readonly metric: HealthMetric
  readonly from: string
  readonly to: string
}): Promise<readonly HealthSampleRecord[]> {
  const root = checkoutRoot()
  const fromMs = instantMs(args.from)
  const toMs = instantMs(args.to)
  const found: HealthSampleRecord[] = []
  for (let at = fromMs - DAY_MS; at <= toMs + DAY_MS; at += DAY_MS) {
    const path = sampleRowsAt(root, civilDayOf(at))
    if (!existsSync(path)) continue
    for (const line of readFileSync(path, "utf8").split("\n")) {
      const text = line.trim()
      if (text === "") continue
      let values: unknown
      try {
        values = JSON.parse(text)
      } catch {
        throw new Error(`selectHealthSamples: ${path} carries a line that is not JSON`)
      }
      const held = recordOf(values as Readonly<Record<string, unknown>>)
      if (held === null || held.metric !== args.metric) continue
      const startedMs = instantMs(held.startedAt)
      if (startedMs < fromMs || startedMs >= toMs) continue
      found.push(held)
    }
  }
  found.sort((a, b) => instantMs(a.startedAt) - instantMs(b.startedAt))
  return found.length > ROW_CEILING ? found.slice(0, ROW_CEILING) : found
}
