import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const overwhereIvNyrelisGrove = {
  id: "01a0ed29-8e0d-7461-92e6-bcdea162a125",
  type: "page-type/place",
  slug: "overwhere-iv-nyrelis-grove",
  title: "Nyrelis Grove",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  facts: [
    {
      fact: "The Nyrelis Grove is an elven forest on the southern shores of the Vaelyssan Sea.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It is the elven land nearest the sea and lies far south of the Vaelyssan floating forts.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Lord Aeson of Nyrelis patrols the grove's edges and escorts guests out of it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Visitors leaving the grove are walked to its edge and not let back without leave.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Two tree dungeons lie near the grove, run by the masters Ygdran and Juniper.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "With the mermen gone, the Nyrelis elves may claim the riches of the Vaelyssan Sea.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A long wild coast runs north from the grove, with brineling caves along the tides.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
