import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const tempestOfTheLightningGiant = {
  id: "01a06572-95e6-7495-80b3-bbb3ffd1aacb",
  type: "page-type/world-spell",
  slug: "tempest-of-the-lightning-giant",
  title: "Tempest of the Lightning Giant",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
