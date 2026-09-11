import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const flashbang = {
  id: "01a06572-95c4-7a8d-b1b1-90d4ed903444",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "flashbang",
  title: "Flashbang",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
