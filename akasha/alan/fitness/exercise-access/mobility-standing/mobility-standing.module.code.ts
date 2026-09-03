import { numberIn, type Row, rowsFor, textIn } from "../exercise-rows/exercise-rows.module.code.ts"
import {
  mobilityTrend,
  NO_SIDE,
  type Trend,
} from "../mobility-derive/mobility-derive.module.code.ts"

const MOBILITY_READING = "mobility-reading"

const READINGS_AT_MOST = 500

export interface MobilityStanding {
  readonly metric: string
  readonly side: string | null
  readonly latestText: string | null
  readonly latestNum: number | null
  readonly date: string | null
  readonly readingCount: number
  readonly trend: Trend
}

export type Standings =
  | { readonly standings: readonly MobilityStanding[] }
  | { readonly refused: string }

interface Gathered {
  readonly rows: Row[]
  readonly metric: string
  readonly side: string | null
}

export function gatheredIn(readings: readonly Row[]): readonly Gathered[] {
  const held = new Map<string, Gathered>()
  for (const row of readings) {
    const metric = textIn(row, "mobilityReadingMetric")
    if (metric === undefined) continue
    const side = textIn(row, "side") ?? null
    const key = `${metric}::${side ?? ""}`
    const found = held.get(key) ?? { rows: [], metric, side }
    found.rows.push(row)
    held.set(key, found)
  }
  return [...held.values()]
}

export function standingsIn(readings: readonly Row[]): readonly MobilityStanding[] {
  return gatheredIn(readings).map(({ rows, metric, side }) => {
    const latest = rows[rows.length - 1]
    const numbers = rows
      .map((row) => numberIn(row, "mobilityReadingValueNum"))
      .filter((one): one is number => one !== undefined)
    return {
      metric,
      side: side === NO_SIDE ? null : side,
      latestText:
        latest === undefined ? null : (textIn(latest, "mobilityReadingValueText") ?? null),
      latestNum:
        latest === undefined ? null : (numberIn(latest, "mobilityReadingValueNum") ?? null),
      date: latest === undefined ? null : (textIn(latest, "mobilityReadingDate") ?? null),
      readingCount: rows.length,
      trend: mobilityTrend(numbers),
    }
  })
}

export async function mobilityStandings(): Promise<Standings> {
  const found = await rowsFor({
    pageTypeSlug: MOBILITY_READING,
    order: [{ by: "mobilityReadingDate", dir: "asc" }],
    limit: READINGS_AT_MOST,
  })
  if ("unread" in found) return { refused: found.unread }
  return { standings: standingsIn(found.rows) }
}
