import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const waterWall = {
  id: "01a06572-95e9-7db0-a03a-ac855823f6a1",
  type: "page-type/world-spell",
  slug: "water-wall",
  title: "Water Wall",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
