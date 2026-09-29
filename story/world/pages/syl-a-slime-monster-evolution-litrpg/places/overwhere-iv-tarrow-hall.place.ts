import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const overwhereIvTarrowHall = {
  id: "01a0ed2d-4007-7f1d-b1e5-2a4edf73977d",
  type: "page-type/place",
  slug: "overwhere-iv-tarrow-hall",
  title: "Tarrow Hall",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  facts: [
    {
      fact: "Tarrow Hall is the manor of the barony of Tarrow, a day's ride north of Millbrook.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It is the seat of the old Baroness Maud Tarrow, who lies ill there.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The hall is an old grey manor with a tower, a walled yard and a small guard of its own.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
