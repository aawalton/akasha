import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const magicalAnchor = {
  id: "01a06572-95d1-7916-b908-b9019d8f933e",
  type: "page-type/world-spell",
  slug: "magical-anchor",
  title: "Magical Anchor",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
