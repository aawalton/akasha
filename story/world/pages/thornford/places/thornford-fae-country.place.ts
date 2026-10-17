import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const thornfordFaeCountry = {
  id: "01a14bf2-14e9-7131-b69b-e32fb2b44c30",
  type: "page-type/place",
  slug: "thornford-fae-country",
  title: "The Fae Country",
  world: "world/thornford",
  facts: [
    {
      fact: "The fae country lies across the stone ford, and the valley reaches it only on a quarter night.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/thornford-nala",
        "character-other/thornford-shaestrel",
      ],
    },
    {
      fact: "The far bank looks like the valley at first glance, but its trees are in full leaf in any season.",
      knowers: ["lore-disclosure/game-master", "character-other/thornford-shaestrel"],
    },
    {
      fact: "Across the ford the air smells of cut grass and blossom, and the light has no source.",
      knowers: ["lore-disclosure/game-master", "character-other/thornford-shaestrel"],
    },
  ],
  createdAt: "2026-10-17T22:18:38.695Z",
  updatedAt: "2026-10-17T22:18:38.695Z",
} as const satisfies Place
