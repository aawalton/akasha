import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const stoneWalls = {
  id: "01a06572-95e3-7f80-bc53-3d2f45762eec",
  type: "page-type/world-spell",
  slug: "stone-walls",
  title: "Stone Walls",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
