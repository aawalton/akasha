import type { WorldSpell } from "akasha/story/world-mechanic/world-spell/world-spell.page-type.types.ts"

export const spellMassiveExpansion = {
  id: "01a06572-95e2-7dcb-88ed-3875df36dcf9",
  type: "world-spell",
  slug: "spell-massive-expansion",
  title: "Spell: Massive Expansion",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
