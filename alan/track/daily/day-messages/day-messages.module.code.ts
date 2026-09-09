import { mergeUncommitted, uncommittedIn } from "@akasha/pages/page-uncommitted"
import { getEsoDayStr } from "akasha/alan/harness/day/eso-day/eso-day.module.code.ts"
import { dayStanding } from "../akasha-day/akasha-day.module.code.ts"
import { dayNameOf } from "../day-place/day-place.module.code.ts"

const PERSONA_MESSAGES = "personaMessages"

const PERSONA = "persona"

const SENT = "sent"

export type Counted = { readonly persona: string; readonly sent: number }

export function countedIn(held: unknown): readonly Counted[] {
  if (!Array.isArray(held)) return []
  const found: Counted[] = []
  for (const one of held) {
    if (typeof one !== "object" || one === null) continue
    const row = one as Readonly<Record<string, unknown>>
    const slug = row[PERSONA]
    const sent = row[SENT]
    if (typeof slug !== "string" || slug === "" || typeof sent !== "number") continue
    found.push({ persona: slug, sent })
  }
  return found
}

export function sentIn(counted: readonly Counted[], slug: string): number | null {
  for (const one of counted) {
    if (one.persona === slug) return one.sent
  }
  return null
}

export function raisedIn(counted: readonly Counted[], slug: string): readonly Counted[] {
  if (sentIn(counted, slug) === null) return [...counted, { persona: slug, sent: 1 }]
  return counted.map((one) => (one.persona === slug ? { persona: slug, sent: one.sent + 1 } : one))
}

export function dayPageAt(root: string, dayStr: string): string | null {
  return dayStanding(root, dayNameOf(dayStr))?.path ?? null
}

export function messagesOn(root: string, page: string): readonly Counted[] {
  const held = uncommittedIn(root, page)
  return held === null ? [] : countedIn(held[PERSONA_MESSAGES])
}

export function raiseMessagesOn(root: string, page: string, slug: string): readonly Counted[] {
  const raised = raisedIn(messagesOn(root, page), slug)
  mergeUncommitted(root, page, { [PERSONA_MESSAGES]: raised })
  return raised
}

export function raiseMessages(root: string, slug: string, now: Date): readonly Counted[] | null {
  const page = dayPageAt(root, getEsoDayStr(now))
  return page === null ? null : raiseMessagesOn(root, page, slug)
}
