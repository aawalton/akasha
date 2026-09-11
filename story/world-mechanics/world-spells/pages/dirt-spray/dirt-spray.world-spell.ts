import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const dirtSpray = {
  id: "01a06572-95bd-7063-a493-604d92d4802e",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "dirt-spray",
  title: "Dirt Spray",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
