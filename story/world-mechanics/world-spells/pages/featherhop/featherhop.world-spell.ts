import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const featherhop = {
  id: "01a06572-95c0-7e14-8857-9a789eb08aa2",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "featherhop",
  title: "Featherhop",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
