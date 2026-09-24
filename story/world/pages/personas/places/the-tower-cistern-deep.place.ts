import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const theTowerCisternDeep = {
  id: "01a0d440-06d6-780e-a837-4d579935c440",
  type: "page-type/place",
  slug: "the-tower-cistern-deep",
  title: "The Deep Water",
  world: "world/personas",
  loreDisclosure: "lore-disclosure/player",
  within: "place/the-tower-floor-02",
  depth: 2,
  description:
    "Where the walkway gives out, the flood opens into the heart of the undercroft. The Drowned Sentry stands waist-deep on a submerged platform, barring the path to the spiral stair. The water here is full of slow movement — the Glut, a pooled mass of leech-things, drifts just under the surface, drawn to warmth and disturbance.",
  exits: [
    { to: "place/the-tower-cistern-walkway", way: "back along the walkway" },
    { to: "place/the-tower-gallery-nave", way: "the sealed spiral stair forward" },
  ],
  facts: [
    "The Deep Water is dim, lit only by phosphorescent silhouettes.",
    "Deep water surrounds the Deep Water's submerged platform on three sides.",
  ],
} as const satisfies Place
