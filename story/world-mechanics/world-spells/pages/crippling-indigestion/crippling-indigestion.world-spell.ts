import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const cripplingIndigestion = {
  id: "01a06572-95bb-7dfb-87a3-0e6cb198e859",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "crippling-indigestion",
  title: "Crippling Indigestion",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
