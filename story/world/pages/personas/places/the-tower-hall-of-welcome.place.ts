import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const theTowerHallOfWelcome = {
  id: "01a0d440-ecf3-7031-a418-b1c78fe675b7",
  type: "page-type/place",
  slug: "the-tower-hall-of-welcome",
  title: "The Hall of Welcome",
  world: "world/personas",
  loreDisclosure: "lore-disclosure/player",
  within: "place/the-tower-floor-05",
  depth: 5,
  description:
    "Past the threshold, a bare, cold stone hall. The warmth, the couches and the made bed that seemed to wait along its wall went with the gold, and nothing here offers rest or comfort any longer.",
  exits: [
    { to: "place/the-tower-haven-threshold", way: "back to the threshold (and down to floor 4)" },
    { to: "place/the-tower-the-long-gallery", way: "forward to the Long Gallery" },
  ],
  facts: ["The Hall of Welcome holds no water."],
} as const satisfies Place
