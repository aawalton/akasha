import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const frostBloom = {
  id: "01a06572-95c5-79a0-bc6d-257b5f21f677",
  type: "page-type/world-spell",
  slug: "frost-bloom",
  title: "Frost Bloom",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
