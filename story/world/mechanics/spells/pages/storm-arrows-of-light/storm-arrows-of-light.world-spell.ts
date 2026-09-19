import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const stormArrowsOfLight = {
  id: "01a06572-95e4-71a5-a444-3303b1cba976",
  type: "page-type/world-spell",
  slug: "storm-arrows-of-light",
  title: "Storm Arrows of Light",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
