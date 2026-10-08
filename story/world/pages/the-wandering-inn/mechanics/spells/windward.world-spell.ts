import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const windward = {
  id: "01a06572-95ea-74a6-9435-29a0bb3a9ec5",
  type: "page-type/world-spell",
  slug: "windward",
  title: "Windward",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.434Z",
  updatedAt: "2026-09-22T13:35:07.000Z",
} as const satisfies WorldSpell
