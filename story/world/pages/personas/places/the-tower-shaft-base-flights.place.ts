import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const theTowerShaftBaseFlights = {
  id: "01a0d440-b485-779a-8f47-04869f9880d6",
  type: "page-type/place",
  slug: "the-tower-shaft-base-flights",
  title: "The Broken Flights",
  world: "world/personas",
  loreDisclosure: "lore-disclosure/player",
  within: "place/the-tower-floor-04",
  depth: 4,
  description:
    "The bottom of the shaft: a series of stone stairflights bolted to the wall, several collapsed into gaps a long step or a short leap apart. Between and above them, the slabs begin — flat counterweight platforms hanging still in the dark since the counterweight settled. The wall-stair is solid but incomplete; crossing the gaps means a leap onto a slab. Below the lowest flight: nothing, a cold fall into dark with no bottom in reach.",
  exits: [
    { to: "place/the-tower-gallery-dais", way: "the open arch behind (down to floor 3's dais)" },
    {
      to: "place/the-tower-shaft-mid-slabs",
      way: "UP — the broken flights and the stilled slabs are the only way toward the grey seam at the top",
    },
  ],
  facts: [
    "The Broken Flights lie in near-total darkness.",
    "Past any lamp lit there, the Broken Flights' only light is the far grey seam.",
  ],
} as const satisfies Place
