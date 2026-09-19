import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const tempestOfThunder = {
  id: "01a06572-95e6-793a-88cd-b57f48151f89",
  type: "page-type/world-spell",
  slug: "tempest-of-thunder",
  title: "Tempest of Thunder",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
