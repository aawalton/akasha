import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const plagueOfRats = {
  id: "01a06572-95db-7f2a-810c-677f57cc6195",
  type: "page-type/world-spell",
  slug: "plague-of-rats",
  title: "Plague of Rats",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.419Z",
  updatedAt: "2026-09-22T13:34:49.000Z",
} as const satisfies WorldSpell
