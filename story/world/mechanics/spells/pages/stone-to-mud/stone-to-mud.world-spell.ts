import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const stoneToMud = {
  id: "01a06572-95e3-7af8-9537-36d3fce86936",
  type: "page-type/world-spell",
  slug: "stone-to-mud",
  title: "Stone to Mud",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
