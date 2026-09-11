import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const createLesserSandGolem = {
  id: "01a06572-95bb-7699-bd15-aeb68e06cd87",
  type: "world-spell",
  slug: "create-lesser-sand-golem",
  title: "Create Lesser Sand Golem",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
