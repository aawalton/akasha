import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const volcanicEruption = {
  id: "01a06572-95e8-7e87-8f28-220c8def61f6",
  type: "page-type/world-spell",
  slug: "volcanic-eruption",
  title: "Volcanic Eruption",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.432Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
