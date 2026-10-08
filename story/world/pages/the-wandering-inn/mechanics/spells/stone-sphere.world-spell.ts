import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const stoneSphere = {
  id: "01a06572-95e3-77c9-8e8d-de3d81094108",
  type: "page-type/world-spell",
  slug: "stone-sphere",
  title: "Stone Sphere",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.427Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
