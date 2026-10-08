import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const trueSight = {
  id: "01a06572-95e7-7672-9ae4-de893a9175e9",
  type: "page-type/world-spell",
  slug: "true-sight",
  title: "True Sight",
  world: "world/the-wandering-inn",
  appearanceCount: 6,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.431Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
