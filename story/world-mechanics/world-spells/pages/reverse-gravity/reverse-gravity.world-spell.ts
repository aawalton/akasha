import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const reverseGravity = {
  id: "01a06572-95dd-72ed-9460-40d58a92c486",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "reverse-gravity",
  title: "Reverse Gravity",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
