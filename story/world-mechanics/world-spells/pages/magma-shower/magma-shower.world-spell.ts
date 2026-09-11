import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const magmaShower = {
  id: "01a06572-95d1-71b7-964c-caf36877fba8",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "magma-shower",
  title: "Magma Shower",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
