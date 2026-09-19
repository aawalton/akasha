import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const salamanderSSkin = {
  id: "01a06572-95de-7ea2-8ab8-273f7cd3979a",
  type: "page-type/world-spell",
  slug: "salamander-s-skin",
  title: "Salamander’s Skin",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
