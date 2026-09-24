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
    "The top of the shaft, where the slabs dock against a stone gantry and the grey-lit exit-stair finally appears, just beyond. The central chain terminates here, wound around an immense seated figure of fused stone and iron — the Counterweight Colossus, the warden that IS the floor's counterweight. It does not move until something tries to pass onto the exit-stair; its mass is the tension that holds every slab below in balance. Drop it, and the whole moving system goes still.",
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
