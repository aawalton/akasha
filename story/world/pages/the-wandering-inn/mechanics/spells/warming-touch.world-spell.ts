import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const warmingTouch = {
  id: "01a06572-95e9-7c6c-8e44-f195a4618c91",
  type: "page-type/world-spell",
  slug: "warming-touch",
  title: "Warming Touch",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.433Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
