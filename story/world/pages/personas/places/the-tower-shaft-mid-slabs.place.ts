import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const theTowerShaftMidSlabs = {
  id: "01a0d440-8f30-71b1-bcb9-797f01223fd6",
  type: "page-type/place",
  slug: "the-tower-shaft-mid-slabs",
  title: "The Moving Dark",
  world: "world/personas",
  loreDisclosure: "lore-disclosure/player",
  within: "place/the-tower-floor-04",
  depth: 4,
  description:
    "The middle of the shaft, where the wall-stair gives out entirely and the only footing is the moving slabs. They rise and sink on their slow beat, passing each other in the dark; crossing means a sequence of timed leaps. This is the Stalker's killing ground — open dark, moving footing, a long fall on every side. The slabs pass close to the central chain here: a single great counterweight-chain runs floor-to-ceiling through the shaft's heart, taut and humming with tension.",
  exits: [
    { to: "place/the-tower-shaft-base-flights", way: "down to the broken flights" },
    { to: "place/the-tower-shaft-headworks", way: "up to the headworks at the shaft's top" },
  ],
  facts: [
    "The Moving Dark is the darkest part of the shaft, reached by no seam light or edge-glow.",
    "The Moving Dark holds no water.",
  ],
} as const satisfies Place
