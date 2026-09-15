import type { WorldSpell } from "akasha/story/world-mechanic/world-spell/world-spell.page-type.types.ts"

export const boundSpellParalysisBolt = {
  id: "01a06572-95b7-705c-8802-d07873845234",
  type: "world-spell",
  slug: "bound-spell-paralysis-bolt",
  title: "Bound Spell – Paralysis Bolt",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
