import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const hush = {
  id: "01a06572-95c9-71c7-b04e-672de7bb6a74",
  type: "page-type/world-spell",
  slug: "hush",
  title: "Hush",
  world: "world/the-wandering-inn",
  appearanceCount: 12,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.401Z",
  updatedAt: "2026-09-22T13:34:41.000Z",
} as const satisfies WorldSpell
