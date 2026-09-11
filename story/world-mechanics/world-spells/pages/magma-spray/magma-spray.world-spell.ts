import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const magmaSpray = {
  id: "01a06572-95d1-79c2-8e92-462dd2b94e37",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "magma-spray",
  title: "Magma Spray",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
