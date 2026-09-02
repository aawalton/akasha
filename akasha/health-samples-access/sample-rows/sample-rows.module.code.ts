import type { HealthSampleRecord } from "../sample-shape/sample-shape.module.code.ts"

export const ANCHOR_PAGE_TYPE = "eso-day"

export const ROW_CEILING = 50000

export function textAt(values: Readonly<Record<string, unknown>>, key: string): string {
  const held = values[key]
  return typeof held === "string" ? held : ""
}

export function numberAt(values: Readonly<Record<string, unknown>>, key: string): number {
  const held = values[key]
  if (typeof held === "number") return held
  const read = typeof held === "string" ? Number(held) : Number.NaN
  return Number.isFinite(read) ? read : Number.NaN
}

export function recordOf(values: Readonly<Record<string, unknown>>): HealthSampleRecord | null {
  const metric = textAt(values, "metric")
  if (metric !== "activeEnergy" && metric !== "stepCount") return null
  const value = numberAt(values, "value")
  if (!Number.isFinite(value)) return null
  return {
    id: textAt(values, "id"),
    metric,
    startedAt: textAt(values, "startedAt"),
    endedAt: textAt(values, "endedAt"),
    value,
    unit: textAt(values, "unit"),
    sourceName: textAt(values, "sourceName"),
    arrivedAt: textAt(values, "arrivedAt"),
  }
}
