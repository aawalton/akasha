import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const sandSprite = {
  id: "01a06572-95de-7a30-98cd-56ff7ad24995",
  type: "page-type/world-spell",
  slug: "sand-sprite",
  title: "Sand Sprite",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
