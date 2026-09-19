import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const frostbolt = {
  id: "01a06572-95c5-73d7-aaea-75d573ecaa48",
  type: "page-type/world-spell",
  slug: "frostbolt",
  title: "Frostbolt",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
