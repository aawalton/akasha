import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const flamewall = {
  id: "01a06572-95c3-78a7-85b8-7bfa93fa75d8",
  type: "world-spell",
  slug: "flamewall",
  title: "Flamewall",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
