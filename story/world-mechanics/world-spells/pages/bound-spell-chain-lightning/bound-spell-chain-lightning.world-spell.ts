import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const boundSpellChainLightning = {
  id: "01a06572-95b7-7a80-8b1b-2e5f62e47097",
  type: "world-spell",
  slug: "bound-spell-chain-lightning",
  title: "Bound Spell: Chain Lightning",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
