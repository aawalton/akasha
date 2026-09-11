import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const hurricaneOfDarkness = {
  id: "01a06572-95c9-75a7-ab19-ecb5913366cc",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "hurricane-of-darkness",
  title: "Hurricane of Darkness",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
