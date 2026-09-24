import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const theTowerFloor05 = {
  id: "01a0d441-2f78-7b03-a48f-36ae94912610",
  type: "page-type/place",
  slug: "the-tower-floor-05",
  title: "The False Haven",
  world: "world/personas",
  loreDisclosure: "lore-disclosure/player",
  depth: 5,
  description:
    "The grey seam at the top of the dark shaft opens onto a long run of low, cold, wet stone rooms, dark and bare: the hearths are dead grey ash, the tables bare boards set for no one, and the bones of climbers who sat down to rest lie where the chairs seemed to be. In the last room a sheer drop is torn across the floor, and past it a plain stair climbs on into the dark.",
  exits: [
    {
      way: "the plain ascending stair past the drop in the Host's Seat, cold air pouring down it",
    },
  ],
  facts: [
    "No woven light or warmth remains anywhere in the False Haven.",
    "The False Haven is dark but for fire brought into it.",
  ],
} as const satisfies Place
