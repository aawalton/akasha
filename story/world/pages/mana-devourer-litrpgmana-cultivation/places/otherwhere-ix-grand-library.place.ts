import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereIxGrandLibrary = {
  id: "01a0ea41-cb07-74c2-b840-e7178782f7e1",
  type: "page-type/place",
  slug: "otherwhere-ix-grand-library",
  title: "The Grand Library",
  world: "world/mana-devourer-litrpgmana-cultivation",
  within: "place/otherwhere-ix-sun-city-arena",
  facts: [
    {
      fact: "The grand library lies upstairs from the arena dungeon, behind a barrier.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The library barrier bars the soul-contracted from passing in.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The barrier also stops things being carried past a threshold, even a slip of paper.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The library holds tax codes, romances, medical texts, travel memoirs, poetry and botany.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The library also keeps treatises on contract law, such as the terms of soul contracts.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Labor is short, so a worker caught taking library books would only be shouted at.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Workers making rounds near the library slip books out; a vase near it hides notes.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
