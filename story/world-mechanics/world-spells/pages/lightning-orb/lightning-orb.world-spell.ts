import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const lightningOrb = {
  id: "01a06572-95d0-7192-8b59-2003f0597172",
  type: "world-spell",
  slug: "lightning-orb",
  title: "Lightning Orb",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
