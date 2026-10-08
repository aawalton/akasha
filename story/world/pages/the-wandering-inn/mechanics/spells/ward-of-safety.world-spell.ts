import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const wardOfSafety = {
  id: "01a06572-95e9-7e09-98e5-661c8bc38bcf",
  type: "page-type/world-spell",
  slug: "ward-of-safety",
  title: "Ward of Safety",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.433Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
