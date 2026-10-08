import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const stoneFist = {
  id: "01a06572-95e3-748e-898a-9410316b9791",
  type: "page-type/world-spell",
  slug: "stone-fist",
  title: "Stone Fist",
  world: "world/the-wandering-inn",
  appearanceCount: 8,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.427Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
