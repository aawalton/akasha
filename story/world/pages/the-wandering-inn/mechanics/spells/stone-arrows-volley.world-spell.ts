import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const stoneArrowsVolley = {
  id: "01a06572-95e3-78ce-99d9-c104e9453b6f",
  type: "page-type/world-spell",
  slug: "stone-arrows-volley",
  title: "Stone Arrows: Volley",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
