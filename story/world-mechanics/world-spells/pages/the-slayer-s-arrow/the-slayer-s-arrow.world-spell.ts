import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const theSlayerSArrow = {
  id: "01a06572-95e6-73ce-a033-c51a368228e7",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "the-slayer-s-arrow",
  title: "The ___slayer’s Arrow",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
