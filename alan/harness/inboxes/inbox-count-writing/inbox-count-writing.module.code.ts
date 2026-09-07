import { statedAt } from "@akasha/readout-system/readout-tier"
import {
  DAILY_TRACKING,
  landDayPage,
} from "../../../tracking/daily/day-place/day-place.module.code.ts"
import { askDayByDate } from "../../../tracking/daily/day-reading/day-reading.module.code.ts"
import { resolveOrCreateDaily } from "../../../tracking/daily/tracking-resolve/tracking-resolve.module.code.ts"
import {
  INBOX_WRITER,
  type PersistOutcome,
  persistEmailEntry,
} from "../email-entry-writing/email-entry-writing.module.code.ts"
import {
  CLEARED_ATTR,
  COUNT_ATTR,
  INBOX_KEYS,
  type InboxKey,
} from "../inbox-keys/inbox-keys.module.code.ts"

type RowBefore = Readonly<Record<string, unknown>> | undefined

function truthy(value: unknown): boolean {
  return value === true || value === 1 || value === "true"
}

function buildAttrs(
  counts: Partial<Record<InboxKey, number>>,
  row: RowBefore
): Record<string, number | boolean> {
  const attrs: Record<string, number | boolean> = {}
  for (const key of INBOX_KEYS) {
    const count = counts[key]
    const countAttr = COUNT_ATTR[key]
    const clearedAttr = CLEARED_ATTR[key]
    if (count === undefined || countAttr === undefined || clearedAttr === undefined) continue
    attrs[countAttr] = count
    attrs[clearedAttr] = truthy(row?.[clearedAttr]) || count === 0
  }
  return attrs
}

export function alreadyThere(
  attrs: Readonly<Record<string, number | boolean>>,
  row: RowBefore
): boolean {
  if (row === undefined) return false
  for (const [key, value] of Object.entries(attrs)) {
    if (typeof value === "boolean") {
      if (truthy(row[key]) !== value) return false
    } else if (statedAt(row[key]) !== value) {
      return false
    }
  }
  return true
}

export async function persistInboxCounts(
  counts: Partial<Record<InboxKey, number>>,
  day: string,
  now: Date
): Promise<PersistOutcome> {
  const email = counts.email
  if (email !== undefined) await persistEmailEntry(email, now)

  const asked = await askDayByDate(day)
  if (!asked.ok) throw new Error(`reading ${DAILY_TRACKING} for ${day}: ${asked.why}`)
  const attrs = buildAttrs(counts, asked.rows[0]?.values)
  if (alreadyThere(attrs, asked.rows[0]?.values)) return "unchanged"
  const { created } = await resolveOrCreateDaily(null, day)
  const landed = await landDayPage("patch", day, attrs, INBOX_WRITER)
  if (!landed.ok) throw new Error(`writing ${DAILY_TRACKING} for ${day}: ${landed.why}`)
  return created ? "created" : "patched"
}
