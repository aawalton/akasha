import { askNamed } from "@akasha/pages-query"
import { type Fetcher, pagesFetcher } from "@akasha/pages-query/fetcher"
import type { RingScale } from "../readout/readouts/monarch-unreviewed-transactions/monarch-unreviewed-transactions.readout.code.ts"

const READOUT_SCALES_ALL = "readout-scales-all"

const BACKLOG_COUNT_SLUG = "backlog-count"

export function declaredThreshold(value: unknown): number | null {
  if (typeof value === "number") return Number.isFinite(value) ? value : null
  if (typeof value !== "string") return null
  const trimmed = value.trim()
  if (trimmed.length === 0) return null
  const parsed = Number(trimmed)
  return Number.isFinite(parsed) ? parsed : null
}

export function scaleIn(values: Readonly<Record<string, unknown>>): RingScale | undefined {
  const orangeAt = declaredThreshold(values["orange-at"])
  const redAt = declaredThreshold(values["red-at"])
  const blackAt = declaredThreshold(values["black-at"])
  if (orangeAt === null || redAt === null || blackAt === null) return undefined

  const yellowAt = declaredThreshold(values["yellow-at"])
  return { orangeAt, redAt, blackAt, ...(yellowAt === null ? {} : { yellowAt }) }
}

export async function readBacklogCountScale(
  fetcher: Fetcher = pagesFetcher()
): Promise<RingScale | undefined> {
  const asked = await askNamed(READOUT_SCALES_ALL, fetcher)
  if (!asked.ok) return undefined

  const row = asked.answer.rows.find((r) => r.values.slug === BACKLOG_COUNT_SLUG)
  if (row === undefined) return undefined
  return scaleIn(row.values)
}
