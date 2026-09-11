import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const detectParasites = {
  id: "01a06572-95bd-73a3-8a33-3a936d1bc987",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "detect-parasites",
  title: "Detect Parasites",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
