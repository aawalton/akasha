import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const confusion = {
  id: "01a06572-95b9-7356-84dd-c408d69b92f6",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "confusion",
  title: "Confusion",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
