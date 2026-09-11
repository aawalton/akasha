import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const stoneSword = {
  id: "01a06572-95e3-7370-8198-4a00abf0a6d6",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "stone-sword",
  title: "Stone Sword",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
