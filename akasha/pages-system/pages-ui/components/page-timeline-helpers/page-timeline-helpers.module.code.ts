import type { ReadonlyJSONValue } from "@akasha/pages-core/schema/pages"
import type { PageRow } from "@akasha/pages-ui-components/view-engine/view-row"

const DATE_ONLY_REGEX = /^\d{4}-\d{2}-\d{2}$/
const DAY_MS = 86_400_000

export function parseTimelineDateMs(value: ReadonlyJSONValue | undefined): number | null {
  if (typeof value === "number") return Number.isFinite(value) ? value : null
  if (typeof value !== "string" || value === "") return null
  if (DATE_ONLY_REGEX.test(value)) {
    const ms = Date.parse(`${value}T00:00:00Z`)
    return Number.isNaN(ms) ? null : ms
  }
  const ms = Date.parse(value)
  return Number.isNaN(ms) ? null : ms
}

export interface TimelineRowInput {
  id: string
  startMs: number | null
  endMs: number | null
}

export function rowsToTimelineInputs(
  rows: readonly PageRow[],
  startPropertyId: string,
  endPropertyId?: string
): readonly TimelineRowInput[] {
  return rows.map((row) => ({
    id: row._id,
    startMs: parseTimelineDateMs(row[startPropertyId]),
    endMs: endPropertyId != null ? parseTimelineDateMs(row[endPropertyId]) : null,
  }))
}

export interface TimelineBar {
  id: string
  leftPct: number
  widthPct: number
  startMs: number
  endMs: number
  isPoint: boolean
}

export interface TimelineTick {
  ms: number
  leftPct: number
}

export interface TimelineLayout {
  domain: { minMs: number; maxMs: number } | null
  bars: readonly TimelineBar[]
  ticks: readonly TimelineTick[]
  undatedIds: readonly string[]
}

export interface BuildTimelineLayoutOptions {
  minWidthPct?: number
  tickCount?: number
}

export function buildTimelineLayout(
  rows: readonly TimelineRowInput[],
  options: BuildTimelineLayoutOptions = {}
): TimelineLayout {
  const minWidthPct = options.minWidthPct ?? 1.5
  const tickCount = Math.max(2, options.tickCount ?? 6)

  const dated = rows.filter((r): r is TimelineRowInput & { startMs: number } => r.startMs != null)
  const undatedIds = rows.filter((r) => r.startMs == null).map((r) => r.id)

  if (dated.length === 0) {
    return { domain: null, bars: [], ticks: [], undatedIds }
  }

  let minMs = Number.POSITIVE_INFINITY
  let maxMs = Number.NEGATIVE_INFINITY
  for (const r of dated) {
    const end = r.endMs != null && r.endMs > r.startMs ? r.endMs : r.startMs
    if (r.startMs < minMs) minMs = r.startMs
    if (end > maxMs) maxMs = end
  }
  if (minMs === maxMs) {
    minMs -= DAY_MS
    maxMs += DAY_MS
  }
  const span = maxMs - minMs

  const bars: TimelineBar[] = dated.map((r) => {
    const endMs = r.endMs != null && r.endMs > r.startMs ? r.endMs : r.startMs
    const hasRange = endMs > r.startMs
    const leftPct = ((r.startMs - minMs) / span) * 100
    const rawWidthPct = ((endMs - r.startMs) / span) * 100
    const widthPct = hasRange ? Math.max(rawWidthPct, minWidthPct) : 0
    return { id: r.id, leftPct, widthPct, startMs: r.startMs, endMs, isPoint: !hasRange }
  })

  const ticks: TimelineTick[] = []
  for (let i = 0; i < tickCount; i++) {
    const frac = i / (tickCount - 1)
    ticks.push({ ms: minMs + span * frac, leftPct: frac * 100 })
  }

  return { domain: { minMs, maxMs }, bars, ticks, undatedIds }
}

export const TIMELINE_DATE_PROPERTY_TYPES: ReadonlySet<string> = new Set([
  "calendar-date",
  "instant",
])
