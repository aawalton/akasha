import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const voidSphere = {
  id: "01a06572-95e8-7b86-890b-040c7c7d1328",
  type: "page-type/world-spell",
  slug: "void-sphere",
  title: "Void Sphere",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.432Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
