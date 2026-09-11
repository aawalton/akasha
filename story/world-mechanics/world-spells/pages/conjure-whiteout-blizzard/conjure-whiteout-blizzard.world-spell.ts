import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const conjureWhiteoutBlizzard = {
  id: "01a06572-95ba-77a9-8604-4cf23f85ef24",
  type: "world-spell",
  slug: "conjure-whiteout-blizzard",
  title: "Conjure Whiteout Blizzard",
  world: "the-wandering-inn",
} as const satisfies WorldSpell
