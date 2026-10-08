import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const plagueOfFilth = {
  id: "01a06572-95db-75bb-bee3-0b2624208659",
  type: "page-type/world-spell",
  slug: "plague-of-filth",
  title: "Plague of Filth",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.419Z",
  updatedAt: "2026-09-22T13:34:49.000Z",
} as const satisfies WorldSpell
