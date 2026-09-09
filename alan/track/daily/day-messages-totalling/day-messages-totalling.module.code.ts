import { valuesOfType } from "@akasha/pages/index-reading"
import { uncommittedIn } from "@akasha/pages/page-uncommitted"
import { textAt } from "@akasha/pages/page-value"
import { type Counted, countedIn } from "../day-messages/day-messages.module.code.ts"

const PERSONA_MESSAGES = "personaMessages"

const DAY_PAGE_TYPE = "day"

const DATE = "date"

export const MESSAGES_COUNTED_FROM = "2026-08-08"

export type Dayed = { readonly day: string; readonly counted: readonly Counted[] }

export function daysCounted(days: readonly Dayed[], before: string): readonly Dayed[] {
  return days.filter((one) => one.day >= MESSAGES_COUNTED_FROM && one.day < before)
}

export function daysOn(days: readonly Dayed[], day: string): readonly Dayed[] {
  return days.filter((one) => one.day === day)
}

export function sentOver(days: readonly Dayed[]): ReadonlyMap<string, number> {
  const found = new Map<string, number>()
  for (const one of days) {
    for (const row of one.counted) {
      found.set(row.persona, (found.get(row.persona) ?? 0) + row.sent)
    }
  }
  return found
}

export function daysMessaged(root: string): readonly Dayed[] {
  const found: Dayed[] = []
  for (const one of valuesOfType(root, DAY_PAGE_TYPE)) {
    const day = textAt(one.value, DATE)
    if (day === null) continue
    const held = uncommittedIn(root, one.path)
    if (held === null) continue
    const counted = countedIn(held[PERSONA_MESSAGES])
    if (counted.length === 0) continue
    found.push({ day, counted })
  }
  return found
}

export function sentBefore(root: string, before: string): ReadonlyMap<string, number> {
  return sentOver(daysCounted(daysMessaged(root), before))
}
