import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const valmiraSTrueCometStorm = {
  id: "01a06572-95e8-747c-8dcf-1066106ea9fa",
  type: "page-type/world-spell",
  slug: "valmira-s-true-comet-storm",
  title: "Valmira’s True Comet Storm",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
