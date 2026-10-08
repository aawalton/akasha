import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const icySpear = {
  id: "01a06572-95cb-7563-9356-9d5cf06dc20b",
  type: "page-type/world-spell",
  slug: "icy-spear",
  title: "Icy Spear",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.403Z",
  updatedAt: "2026-09-22T13:34:41.000Z",
} as const satisfies WorldSpell
