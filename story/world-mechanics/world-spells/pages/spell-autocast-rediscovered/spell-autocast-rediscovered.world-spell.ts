import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const spellAutocastRediscovered = {
  id: "01a06572-95e2-768f-a488-4dff3fd0813f",
  type: "world-spell",
  slug: "spell-autocast-rediscovered",
  title: "Spell – Autocast Rediscovered!",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
