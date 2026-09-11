import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const lightningResistance = {
  id: "01a06572-95d0-74a7-ace7-287c8a01fce9",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "lightning-resistance",
  title: "Lightning Resistance",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
