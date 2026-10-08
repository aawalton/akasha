import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const deathbolt = {
  id: "01a06572-95bc-733b-9782-3852e3818a84",
  type: "page-type/world-spell",
  slug: "deathbolt",
  title: "Deathbolt",
  world: "world/the-wandering-inn",
  appearanceCount: 45,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.388Z",
  updatedAt: "2026-09-22T13:34:24.000Z",
} as const satisfies WorldSpell
