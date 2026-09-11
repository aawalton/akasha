import { existsSync, readFileSync } from "node:fs"
import { instantMs } from "akasha/alan/harness/health-samples-access/sample-identity/sample-identity.module.code.ts"
import {
  ANCHOR_PAGE_TYPE,
  ROW_CEILING,
  recordOf,
} from "akasha/alan/harness/health-samples-access/sample-rows/sample-rows.module.code.ts"
import type {
  HealthMetric,
  HealthSampleRecord,
} from "akasha/alan/harness/health-samples-access/sample-shape/sample-shape.module.code.ts"
import { resolveRoots } from "akasha/pages/checkout-roots/checkout-roots.module.code.ts"
import { besideAt } from "akasha/pages/file-name/page-file-name.module.code.ts"
import { z } from "zod"

export const SAMPLE_ROWS_KEY = "health-samples"

export const DAYS_KEPT_IN = "alan/track/daily/days/pages"

export const DAY_SLUG_PREFIX = "day-"

const HELD = "jsonl"

const DAY_MS = 86400000

const SAMPLE_ROW = z.record(z.string(), z.unknown())

export function checkoutRoot(): string {
  const roots = resolveRoots()
  const target = roots.target
  const at = target === undefined ? undefined : roots[target]
  if (at === undefined || at === "") {
    throw new Error("health-samples: nothing says which checkout the readings are kept in")
  }
  return at
}

export function dayFolderAt(day: string): string {
  return `${DAYS_KEPT_IN}/${day}`
}

export function dayPageAt(day: string): string {
  return `${dayFolderAt(day)}/${DAY_SLUG_PREFIX}${day}.${ANCHOR_PAGE_TYPE}.ts`
}

export function sampleRowsIn(day: string): string {
  const beside = besideAt(dayPageAt(day), SAMPLE_ROWS_KEY, HELD)
  if (beside === null) {
    throw new Error(`sampleRowsIn: ${dayPageAt(day)} is no page a row can sit beside`)
  }
  return beside
}

export function sampleRowsAt(root: string, day: string): string {
  return `${root}/${sampleRowsIn(day)}`
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
      let values: Readonly<Record<string, unknown>>
      try {
        values = SAMPLE_ROW.parse(JSON.parse(text))
      } catch {
        throw new Error(`selectHealthSamples: ${path} carries a line that is no JSON object`)
      }
      const held = recordOf(values)
      if (held === null || held.metric !== args.metric) continue
      const startedMs = instantMs(held.startedAt)
      if (startedMs < fromMs || startedMs >= toMs) continue
      found.push(held)
    }
  }
  found.sort((a, b) => instantMs(a.startedAt) - instantMs(b.startedAt))
  return found.length > ROW_CEILING ? found.slice(0, ROW_CEILING) : found
}
