import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const cleansed = {
  id: "01a06572-95b9-7d15-8dc6-df23dac9be4b",
  type: "page-type/world-spell",
  slug: "cleansed",
  title: "Cleansed",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.385Z",
  updatedAt: "2026-09-22T13:34:24.000Z",
} as const satisfies WorldSpell
