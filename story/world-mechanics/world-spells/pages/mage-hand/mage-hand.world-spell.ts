import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const mageHand = {
  id: "01a06572-95d0-79e3-9001-b921a8c57306",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "mage-hand",
  title: "Mage Hand",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
