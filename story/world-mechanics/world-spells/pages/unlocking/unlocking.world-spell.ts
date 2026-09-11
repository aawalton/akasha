import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const unlocking = {
  id: "01a06572-95e8-754d-abe2-50cd3d1daa50",
  type: "world-spell",
  slug: "unlocking",
  title: "Unlocking",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
