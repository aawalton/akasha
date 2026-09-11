import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const airJet = {
  id: "01a06572-95b3-78f0-93dd-a87505abec86",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "air-jet",
  title: "Air Jet",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
