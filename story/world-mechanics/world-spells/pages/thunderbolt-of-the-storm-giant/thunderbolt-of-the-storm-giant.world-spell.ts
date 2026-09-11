import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const thunderboltOfTheStormGiant = {
  id: "01a06572-95e7-7073-b1db-86d9a0f702d5",
  type: "world-spell",
  slug: "thunderbolt-of-the-storm-giant",
  title: "Thunderbolt of the Storm Giant",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
