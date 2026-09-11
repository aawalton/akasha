import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const glaciusWall = {
  id: "01a06572-95c6-72b7-ad0b-61959f55ccc9",
  type: "world-spell",
  slug: "glacius-wall",
  title: "Glacius Wall",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
