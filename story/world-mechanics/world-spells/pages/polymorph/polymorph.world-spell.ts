import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const polymorph = {
  id: "01a06572-95db-70ac-bb1f-7fa2f3f2bc61",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "polymorph",
  title: "Polymorph",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
