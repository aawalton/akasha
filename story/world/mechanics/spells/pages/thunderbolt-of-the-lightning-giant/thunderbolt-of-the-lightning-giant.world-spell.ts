import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const thunderboltOfTheLightningGiant = {
  id: "01a06572-95e7-7efb-8099-f6af786bf5ac",
  type: "page-type/world-spell",
  slug: "thunderbolt-of-the-lightning-giant",
  title: "Thunderbolt of the Lightning Giant",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
