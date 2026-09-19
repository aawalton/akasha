import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const circleOfPurification = {
  id: "01a06572-95b9-7cae-9099-efa9950276fe",
  type: "page-type/world-spell",
  slug: "circle-of-purification",
  title: "Circle of Purification",
  world: "world/the-wandering-inn",
} as const satisfies WorldSpell
