import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVSlick = {
  id: "01a0e9fc-d639-7fbc-888c-0003da713247",
  type: "page-type/lore",
  slug: "otherwhere-v-slick",
  title: "Slick",
  world: "world/ends-of-magic",
  about: "world-character/otherwhere-v-slick",
  facts: [
    {
      fact: "Slick is a wiry, scarred orc Questor, master-at-arms of the Ashen Accord.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He is held to be the strongest member of the Ashen Accord.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He carries no visible weapons but fights with an adamantium axe.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "His motto is 'Paths stretch as far as you can walk them.'",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In this season he trains the Ashen Accord's fighters in close combat and formations.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
