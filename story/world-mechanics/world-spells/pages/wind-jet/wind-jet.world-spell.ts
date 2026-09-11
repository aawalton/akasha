import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const windJet = {
  id: "01a06572-95ea-7982-9fcb-8b65dfd6308c",
  type: "world-spell",
  slug: "wind-jet",
  title: "Wind Jet",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
