import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const hotHands = {
  id: "01a06572-95c8-78d5-8664-26e383282499",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "hot-hands",
  title: "Hot Hands",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
