import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const theTowerFloor03 = {
  id: "01a0d440-22a8-7d64-a81a-02ff723d84cc",
  type: "page-type/place",
  slug: "the-tower-floor-03",
  title: "The Gallery of Echoes",
  world: "world/personas",
  loreDisclosure: "lore-disclosure/player",
  depth: 3,
  description:
    "The spiral stair climbs into warmth and dry air at last — and into sound. A long vaulted gallery, walls lined with shattered statuary and tall bronze resonance-plates green with age. Every footstep returns threefold. The light is amber and sourceless, seeming to hum. At the far end, a raised dais and a sealed archway up. Two things wait: a wraith of folded sound drifting between the plates, and a stone Warden seated unmoving before the arch.",
  exits: [
    {
      to: "place/the-tower-floor-04",
      way: "ascending archway, far dais (sealed until the floor is cleared)",
    },
  ],
  facts: ["The Gallery of Echoes holds no water."],
} as const satisfies Place
