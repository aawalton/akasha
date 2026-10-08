import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const whirlwindLeap = {
  id: "01a06572-95ea-7a80-941f-f82026f59e08",
  type: "page-type/world-spell",
  slug: "whirlwind-leap",
  title: "Whirlwind Leap",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.434Z",
  updatedAt: "2026-09-22T13:35:07.000Z",
} as const satisfies WorldSpell
