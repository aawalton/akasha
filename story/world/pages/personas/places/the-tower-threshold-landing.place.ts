import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const theTowerThresholdLanding = {
  id: "01a0d43f-f987-7401-9e0e-70173b90feaa",
  type: "page-type/place",
  slug: "the-tower-threshold-landing",
  title: "The Landing (wake point)",
  world: "world/personas",
  loreDisclosure: "lore-disclosure/player",
  within: "place/the-tower-floor-01",
  depth: 1,
  description:
    "The cold, near-lightless room Alan woke in. Old ash and grit underfoot, faintly damp stone, the great vertical dark of the shaft above. One iron door, ajar, to the chamber.",
  exits: [{ to: "place/the-tower-ember-chamber", way: "none — only the iron door to the chamber" }],
  facts: [
    "The Landing's stone is damp from seep, with no pooled water.",
    "No standing water lies anywhere on the Tower's first floor.",
  ],
} as const satisfies Place
