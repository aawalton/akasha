import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const transferRune = {
  id: "01a06572-95e7-7ba1-93e1-20ff369a56a5",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "transfer-rune",
  title: "Transfer Rune",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
