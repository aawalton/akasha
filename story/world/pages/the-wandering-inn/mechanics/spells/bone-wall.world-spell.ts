import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const boneWall = {
  id: "01a06572-95b7-7a97-8015-4db6afafdb60",
  type: "page-type/world-spell",
  slug: "bone-wall",
  title: "Bone Wall",
  world: "world/the-wandering-inn",
  appearanceCount: 14,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.383Z",
  updatedAt: "2026-09-22T13:34:16.000Z",
} as const satisfies WorldSpell
