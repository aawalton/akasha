import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const reduceGravity = {
  id: "01a06572-95dc-7df8-ac39-a989527bd409",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "reduce-gravity",
  title: "Reduce Gravity",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
