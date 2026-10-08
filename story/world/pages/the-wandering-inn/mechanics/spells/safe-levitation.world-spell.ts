import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const safeLevitation = {
  id: "01a06572-95de-77d2-a8c4-b44b5e30bc1b",
  type: "page-type/world-spell",
  slug: "safe-levitation",
  title: "Safe Levitation",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.422Z",
  updatedAt: "2026-09-22T13:34:57.000Z",
} as const satisfies WorldSpell
