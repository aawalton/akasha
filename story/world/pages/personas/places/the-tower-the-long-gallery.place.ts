import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const theTowerTheLongGallery = {
  id: "01a0d440-fcad-79ca-ae66-dac83ca47d4d",
  type: "page-type/place",
  slug: "the-tower-the-long-gallery",
  title: "The Long Gallery",
  world: "world/personas",
  loreDisclosure: "lore-disclosure/player",
  within: "place/the-tower-floor-05",
  depth: 5,
  description:
    "A long, cold stone gallery with silvered glass down both walls, a second bare table and more dead hearths. The gold and the false heat that filled it are gone, and a cold draft runs through it toward the den.",
  exits: [
    { to: "place/the-tower-hall-of-welcome", way: "back to the Hall of Welcome" },
    { to: "place/the-tower-the-deep-den", way: "forward (following the cold) to the Deep Den" },
  ],
  facts: [
    "The Long Gallery's false gold light carries a false heat.",
    "The Long Gallery offers no honest water.",
  ],
} as const satisfies Place
