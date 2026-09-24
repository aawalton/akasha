import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const theTowerFloor01 = {
  id: "01a0d43f-96a3-7797-9d9b-c683a1435dd6",
  type: "page-type/place",
  slug: "the-tower-floor-01",
  title: "The Threshold",
  world: "world/personas",
  loreDisclosure: "lore-disclosure/player",
  depth: 1,
  description:
    "A cold stone landing at the tower's base. Damp, lightless but for a faint glow further in. The air tastes of old ash. One iron door, ajar.",
  exits: [
    { to: "place/the-tower-floor-02", way: "ascending stair (sealed until the floor is cleared)" },
  ],
} as const satisfies Place
