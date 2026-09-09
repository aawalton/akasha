import type { WorldSpell } from "../../world-spell.page-type.ts"

export const metamagicSpellManipulation = {
  id: "01a06572-95d8-71b3-ae30-cdf0f162c4a5",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "metamagic-spell-manipulation",
  title: "Metamagic: Spell Manipulation",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
