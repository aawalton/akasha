import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const theTowerShaftHeadworks = {
  id: "01a0d440-9da1-72f3-8db2-521e1ebeefae",
  type: "page-type/place",
  slug: "the-tower-shaft-headworks",
  title: "The Headworks",
  world: "world/personas",
  loreDisclosure: "lore-disclosure/player",
  within: "place/the-tower-floor-04",
  depth: 4,
  description:
    "The top of the shaft, where the slabs dock against a stone gantry and the grey-lit exit-stair finally appears, just beyond. The Counterweight Colossus lies in pieces across the stone, its winding-drum torn out, and the central chain hangs slack off the gantry; with it down, every slab below has gone still. The gantry is bare, cold stone with nothing alive on it.",
  exits: [
    { to: "place/the-tower-haven-threshold", way: "the grey-lit exit-stair ahead" },
    {
      to: "place/the-tower-shaft-mid-slabs",
      way: "the moving dark behind (now stilled once the Colossus is down)",
    },
  ],
  facts: [
    "The grey seam's light reaches the Headworks' gantry, dim but the best on the floor.",
    "The Headworks holds no water.",
  ],
} as const satisfies Place
