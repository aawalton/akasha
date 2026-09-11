import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const blackflameWall = {
  id: "01a06572-95b6-7b0f-87d2-23e81341982f",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "blackflame-wall",
  title: "Blackflame Wall",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
