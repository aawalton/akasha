import type { RingScale } from "../../../../../akasha/alan-harness/monarch-unreviewed-transactions/monarch-unreviewed-transactions.readout.code.ts"
import { askNamed } from "@shared/pages-query"

const READOUT_SCALES_ALL = "readout-scales-all"

const BACKLOG_COUNT_SLUG = "backlog-count"

function declaredThreshold(value: unknown): number | null {
  if (typeof value === "number") return Number.isFinite(value) ? value : null
  if (typeof value !== "string") return null
  const trimmed = value.trim()
  if (trimmed.length === 0) return null
  const parsed = Number(trimmed)
  return Number.isFinite(parsed) ? parsed : null
}

export async function readBacklogCountScale(): Promise<RingScale | undefined> {
  const asked = await askNamed(READOUT_SCALES_ALL)
  if (!asked.ok) return undefined

  const row = asked.answer.rows.find((r) => r.values.slug === BACKLOG_COUNT_SLUG)
  if (row === undefined) return undefined

  const orangeAt = declaredThreshold(row.values["orange-at"])
  const redAt = declaredThreshold(row.values["red-at"])
  const blackAt = declaredThreshold(row.values["black-at"])
  if (orangeAt === null || redAt === null || blackAt === null) return undefined

  const yellowAt = declaredThreshold(row.values["yellow-at"])
  return { orangeAt, redAt, blackAt, ...(yellowAt === null ? {} : { yellowAt }) }
}
