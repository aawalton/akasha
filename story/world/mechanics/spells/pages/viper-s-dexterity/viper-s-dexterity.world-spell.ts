import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const viperSDexterity = {
  id: "01a06572-95e8-7ff5-8999-287acb877fec",
  type: "page-type/world-spell",
  slug: "viper-s-dexterity",
  title: "Viper’s Dexterity",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
