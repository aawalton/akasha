import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const slickSpellIceFloor = {
  id: "01a06572-95e1-7026-b38e-452828039990",
  type: "page-type/world-spell",
  slug: "slick-spell-ice-floor",
  title: "Slick Spell: Ice Floor",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.425Z",
  updatedAt: "2026-09-22T13:34:57.000Z",
} as const satisfies WorldSpell
