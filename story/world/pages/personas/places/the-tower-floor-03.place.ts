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
    "The spiral stair climbs into dry air at last — and into sound. A long vaulted gallery, walls lined with shattered statuary and tall bronze resonance-plates green with age, and among the rubble the wrecked bones of an old forge. Every footstep returns threefold. The glow that once filled the hall came from its Warden and died with it; the gallery is dark and cold now. The Warden's broken slag lies heaped at the head of the stair from the Cistern. At the far end, a raised dais and an open archway up. Nothing moves here.",
  exits: [
    {
      to: "place/the-tower-floor-04",
      way: "ascending archway, far dais, open",
    },
  ],
  facts: ["The Gallery of Echoes holds no water."],
} as const satisfies Place
