import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const conjureMidnightFamiliar = {
  id: "01a06572-95ba-7fb0-85a9-42a06d787234",
  type: "page-type/world-spell",
  slug: "conjure-midnight-familiar",
  title: "Conjure Midnight Familiar",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
