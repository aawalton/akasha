import { resolveRoots } from "@akasha/pages/checkout-roots"
import { statedAt } from "@akasha/readouts/readout-tier"
import { openedDayOf } from "../../../track/daily/day-opening/day-opening.module.code.ts"
import {
  DAILY_TRACKING,
  landDayPage,
} from "../../../track/daily/day-place/day-place.module.code.ts"
import { askDayByDate } from "../../../track/daily/day-reading/day-reading.module.code.ts"
import { resolveOrCreateDaily } from "../../../track/daily/track-resolve/track-resolve.module.code.ts"
import {
  CLEARED_ATTR,
  COUNT_ATTR,
  INBOX_KEYS,
  type InboxKey,
} from "../keys/inbox-keys.module.code.ts"

export const INBOX_WRITER = "inbox-tracking"

export type PersistOutcome = "created" | "patched" | "unchanged"

const LOWEST_EMAIL_ATTR = "lowest-email-inbox-count"

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

export function keptLow(before: unknown, count: number): number | null {
  const held = statedAt(before)
  return held === null || count < held ? count : null
}

async function keepLowestEmail(count: number, now: Date): Promise<undefined> {
  const day = openedDayOf(resolveRoots(), now)
  const asked = await askDayByDate(day)
  if (!asked.ok) throw new Error(`reading ${DAILY_TRACKING} for ${day}: ${asked.why}`)
  const lower = keptLow(asked.rows[0]?.values[LOWEST_EMAIL_ATTR], count)
  if (lower === null) return undefined
  await resolveOrCreateDaily(null, day)
  const landed = await landDayPage("patch", day, { [LOWEST_EMAIL_ATTR]: lower }, INBOX_WRITER)
  if (!landed.ok) throw new Error(`writing ${DAILY_TRACKING} for ${day}: ${landed.why}`)
  return undefined
}

export async function persistInboxCounts(
  counts: Partial<Record<InboxKey, number>>,
  day: string,
  now: Date
): Promise<PersistOutcome> {
  const email = counts.email
  if (email !== undefined) await keepLowestEmail(email, now)

  const asked = await askDayByDate(day)
  if (!asked.ok) throw new Error(`reading ${DAILY_TRACKING} for ${day}: ${asked.why}`)
  const attrs = buildAttrs(counts, asked.rows[0]?.values)
  if (alreadyThere(attrs, asked.rows[0]?.values)) return "unchanged"
  const { created } = await resolveOrCreateDaily(null, day)
  const landed = await landDayPage("patch", day, attrs, INBOX_WRITER)
  if (!landed.ok) throw new Error(`writing ${DAILY_TRACKING} for ${day}: ${landed.why}`)
  return created ? "created" : "patched"
}
