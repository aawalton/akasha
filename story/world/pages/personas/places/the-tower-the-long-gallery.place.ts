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
    "The haven opens into a long mirrored gallery — silvered glass down both walls, a second table, more hearths, and TWO welcoming figures this time, moving to either side of you with the same warm concern: one pressing a cup, one circling to your back 'to look at that wound.' The warmth here has WEIGHT — you'd swear you feel the hearth's heat on your skin now. The tells are getting harder to keep.",
  exits: [
    { to: "place/the-tower-hall-of-welcome", way: "back to the Hall of Welcome" },
    { to: "place/the-tower-the-deep-den", way: "forward (following the cold) to the Deep Den" },
  ],
  facts: [
    "The Long Gallery's false gold light carries a false heat.",
    "The Long Gallery offers no honest water.",
  ],
} as const satisfies Place
