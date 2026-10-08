import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const createGlassBottle = {
  id: "01a06572-95bb-7333-83a0-afda29173882",
  type: "page-type/world-spell",
  slug: "create-glass-bottle",
  title: "Create Glass Bottle",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.387Z",
  updatedAt: "2026-09-22T13:34:24.000Z",
} as const satisfies WorldSpell
