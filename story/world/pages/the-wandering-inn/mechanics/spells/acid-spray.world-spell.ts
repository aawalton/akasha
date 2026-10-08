import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const acidSpray = {
  id: "01a06572-95b3-7d4c-9737-aa3986bf84c8",
  type: "page-type/world-spell",
  slug: "acid-spray",
  title: "Acid Spray",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.379Z",
  updatedAt: "2026-09-22T13:34:16.000Z",
} as const satisfies WorldSpell
