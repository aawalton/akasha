import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIxMyra = {
  id: "01a0ea36-42db-772b-94c4-cb48fcc1e9a6",
  type: "page-type/lore",
  slug: "otherwhere-ix-myra",
  title: "Myra",
  world: "world/mana-devourer-litrpgmana-cultivation",
  about: "world-character/otherwhere-ix-myra",
  facts: [
    {
      fact: "Myra is a Firrelian goddess whose powers were stripped away centuries ago.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Gods who defy the rule of the gods above are cast down and stripped, as Myra was.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In this season Myra holds no power that anyone reckons with; where she is is unknown.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
