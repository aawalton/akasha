import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const removeHangover = {
  id: "01a06572-95dc-729d-b7d3-01a019a3830d",
  type: "world-spell",
  slug: "remove-hangover",
  title: "Remove Hangover",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
