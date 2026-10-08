import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const boneWalls = {
  id: "01a06572-95b7-7219-97c9-c583a52fcb02",
  type: "page-type/world-spell",
  slug: "bone-walls",
  title: "Bone Walls",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.383Z",
  updatedAt: "2026-09-22T13:34:16.000Z",
} as const satisfies WorldSpell
