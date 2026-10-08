import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const stoneDart = {
  id: "01a06572-95e3-7ea3-9295-b2e0d06d2f7a",
  type: "page-type/world-spell",
  slug: "stone-dart",
  title: "Stone Dart",
  world: "world/the-wandering-inn",
  appearanceCount: 23,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.427Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
