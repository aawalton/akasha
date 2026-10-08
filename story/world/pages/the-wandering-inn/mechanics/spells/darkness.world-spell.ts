import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const darkness = {
  id: "01a06572-95bb-7426-be12-f4bb3774da22",
  type: "page-type/world-spell",
  slug: "darkness",
  title: "Darkness",
  world: "world/the-wandering-inn",
  appearanceCount: 11,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.387Z",
  updatedAt: "2026-09-22T13:34:24.000Z",
} as const satisfies WorldSpell
