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
  ],
  secrets: "jsonl",
} as const satisfies Place
