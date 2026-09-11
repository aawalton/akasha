import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const reduceSpellChainLightning = {
  id: "01a06572-95dc-7ee3-94ca-e7cfbb413a86",
  type: "world-spell",
  slug: "reduce-spell-chain-lightning",
  title: "Reduce Spell: Chain Lightning",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
