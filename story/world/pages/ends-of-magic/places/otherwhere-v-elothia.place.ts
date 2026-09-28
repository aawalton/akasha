import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereVElothia = {
  id: "01a0e9f5-4f84-75fa-b1fd-7b74ec7274ca",
  type: "page-type/place",
  slug: "otherwhere-v-elothia",
  title: "Elothia",
  world: "world/ends-of-magic",
  facts: [
    {
      fact: "Elothia is a continent of forests and dangerous wildlife.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Fire-breathing dragonwolves hunt Elothia's wilds.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Hillboars are among the bigger game of Elothia.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Elothia's settled rim is a thin belt of river villages and towns at the edge of vast forest.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Beyond the settled rim, Elothia's forests hold dungeons and monsters no one has counted.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The folk of the settled rim speak Elothian and pay in copper, silver and rare gold coin.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Serrin Vale is one river valley on Elothia's settled rim, far from any great power.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Elothian Rangers keep lodges in the rim's villages and clear the dungeons near them.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
