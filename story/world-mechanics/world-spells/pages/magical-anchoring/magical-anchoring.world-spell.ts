import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const magicalAnchoring = {
  id: "01a06572-95d1-7464-b57a-afa824d83ed0",
  type: "world-spell",
  slug: "magical-anchoring",
  title: "Magical Anchoring",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
