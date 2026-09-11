import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const slickSpellIceFloor = {
  id: "01a06572-95e1-7026-b38e-452828039990",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "slick-spell-ice-floor",
  title: "Slick Spell: Ice Floor",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
