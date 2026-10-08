import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const warlockSLeap = {
  id: "01a06572-95e9-7efa-a352-ba73aeb03be5",
  type: "page-type/world-spell",
  slug: "warlock-s-leap",
  title: "Warlock’s Leap",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.433Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
