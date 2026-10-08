import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const stoneToMud = {
  id: "01a06572-95e3-7af8-9537-36d3fce86936",
  type: "page-type/world-spell",
  slug: "stone-to-mud",
  title: "Stone to Mud",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.427Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
