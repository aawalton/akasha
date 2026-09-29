import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiDala = {
  id: "01a0ea7c-e4a8-7941-838a-cf75dec05f41",
  type: "page-type/lore",
  slug: "otherwhere-xi-dala",
  title: "Dala",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-dala",
  facts: [
    {
      fact: "Dala is a Hallurian girl who cooked in the Varak clan's war camp.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "When the Varak clan fell, Viv spared Dala along with the slinger Tuk.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Where Dala is this season is unknown.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
