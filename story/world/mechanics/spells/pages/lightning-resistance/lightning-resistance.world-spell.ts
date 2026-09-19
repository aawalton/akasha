import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const lightningResistance = {
  id: "01a06572-95d0-74a7-ace7-287c8a01fce9",
  type: "page-type/world-spell",
  slug: "lightning-resistance",
  title: "Lightning Resistance",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
