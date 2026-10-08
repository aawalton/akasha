import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const fireResistance = {
  id: "01a06572-95c0-7b50-88d8-487010ff35f8",
  type: "page-type/world-spell",
  slug: "fire-resistance",
  title: "Fire Resistance",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.392Z",
  updatedAt: "2026-09-22T13:34:32.000Z",
} as const satisfies WorldSpell
