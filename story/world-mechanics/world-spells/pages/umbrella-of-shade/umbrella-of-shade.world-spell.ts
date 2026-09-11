import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const umbrellaOfShade = {
  id: "01a06572-95e7-7bd1-bd1c-6e9b065d2c35",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "umbrella-of-shade",
  title: "Umbrella of Shade",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
