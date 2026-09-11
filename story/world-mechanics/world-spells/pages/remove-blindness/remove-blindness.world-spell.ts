import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const removeBlindness = {
  id: "01a06572-95dc-7bb8-a51c-cf847351d055",
  type: "world-spell",
  slug: "remove-blindness",
  title: "Remove Blindness",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
