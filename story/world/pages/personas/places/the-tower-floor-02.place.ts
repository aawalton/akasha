import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const theTowerFloor02 = {
  id: "01a0d43f-c5f7-77ec-92c8-4884bc1aa67e",
  type: "page-type/place",
  slug: "the-tower-floor-02",
  title: "The Cistern",
  world: "world/personas",
  loreDisclosure: "lore-disclosure/player",
  depth: 2,
  description:
    "The stair climbs into a vast flooded hall — water held impossibly high in the Tower, by no logic but the System's. Black water laps at a ring of broken walkway. The air is wet, mineral, cold enough to fog breath. Drips echo from a dark too big to see across. Nothing moves in the water now. By the water near the stair up lie the cold ash of an old forge-camp and a skinned, eyeless stalker's carcass. The way on is a corroded spiral stair on the far side, behind the water.",
  exits: [
    {
      to: "place/the-tower-floor-03",
      way: "ascending spiral stair, far side, open",
    },
  ],
} as const satisfies Place
