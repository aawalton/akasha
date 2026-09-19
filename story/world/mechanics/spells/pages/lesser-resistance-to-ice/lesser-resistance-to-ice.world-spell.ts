import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const lesserResistanceToIce = {
  id: "01a06572-95cd-7343-ba2c-652f4f73eaee",
  type: "page-type/world-spell",
  slug: "lesser-resistance-to-ice",
  title: "Lesser Resistance to Ice",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
