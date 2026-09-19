import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const summonManaFamiliar = {
  id: "01a06572-95e4-7239-a4ae-87510e1a1b9d",
  type: "page-type/world-spell",
  slug: "summon-mana-familiar",
  title: "Summon Mana Familiar",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
