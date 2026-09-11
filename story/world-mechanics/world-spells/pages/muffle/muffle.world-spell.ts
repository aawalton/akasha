import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const muffle = {
  id: "01a06572-95d9-74c0-bc98-ba2d3f895dd6",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "muffle",
  title: "Muffle",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
