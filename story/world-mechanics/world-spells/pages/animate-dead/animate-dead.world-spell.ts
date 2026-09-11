import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const animateDead = {
  id: "01a06572-95b4-732c-aba8-c5f742f5c56a",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "animate-dead",
  title: "Animate Dead",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
