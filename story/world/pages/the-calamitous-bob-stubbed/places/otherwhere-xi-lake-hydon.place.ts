import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereXiLakeHydon = {
  id: "01a0ea86-d672-7c3a-a470-9748842725be",
  type: "page-type/place",
  slug: "otherwhere-xi-lake-hydon",
  title: "Lake Hydon",
  world: "world/the-calamitous-bob-stubbed",
  within: "place/otherwhere-xi-enoria",
  facts: [
    {
      fact: "Lake Hydon is a huge freshwater lake in northern Enoria, dotted with islands.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Lake Hydon marks the border between northern Enoria and kark lands.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Lake Hydon feeds the River Shal, which carries its ships east to Helock.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Losserec, Enoria's northern capital, sits on Lake Hydon's shore.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Hollow Mountain rises by Lake Hydon's west shore, at the Deadshield's edge.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The underground Hidden River flows from Hollow Mountain into Lake Hydon.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Fishing boats work Lake Hydon; its shores have fishing shelters with wicker baskets.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Cannibals have been feared along parts of Lake Hydon's shore.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Lake Hydon's fishers will not rent boats to monster hunters.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
