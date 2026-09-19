import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const frozenHeart = {
  id: "01a06572-95c5-79bb-ba5a-ae31787300d2",
  type: "page-type/world-spell",
  slug: "frozen-heart",
  title: "Frozen Heart",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
