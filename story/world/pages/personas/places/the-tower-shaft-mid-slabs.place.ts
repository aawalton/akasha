import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const theTowerShaftMidSlabs = {
  id: "01a0d440-8f30-71b1-bcb9-797f01223fd6",
  type: "page-type/place",
  slug: "the-tower-shaft-mid-slabs",
  title: "The Moving Dark",
  world: "world/personas",
  within: "place/the-tower-floor-04",
  depth: 4,
  description:
    "The middle of the shaft, where the wall-stair gives out entirely and the only footing is the slabs, hanging still in the dark at the heights where they stopped, and one narrow ledge where a long-dead climber sits; crossing means a sequence of leaps between them. Open dark and a long fall on every side, and nothing hunting in it now that the Stalker is dead. The slabs hang close to the central chain here: a single great counterweight-chain running through the shaft's heart, slack now.",
  exits: [
    {
      to: "place/the-tower-shaft-base-flights",
      way: "down to the broken flights",
      direction: "down",
    },
    {
      to: "place/the-tower-shaft-headworks",
      way: "up to the headworks at the shaft's top",
      direction: "up",
    },
  ],
  facts: [
    {
      fact: "The Moving Dark is the darkest part of the shaft, out of reach of the grey seam's light.",
      knowers: ["lore-disclosure/game-master", "character-player/the-tower-alan"],
    },
    {
      fact: "The Moving Dark holds no water.",
      knowers: ["lore-disclosure/game-master", "character-player/the-tower-alan"],
    },
  ],
} as const satisfies Place
