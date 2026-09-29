import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiDeathRites = {
  id: "01a0ea84-11c7-7fbb-96d7-c4439a92adce",
  type: "page-type/lore",
  slug: "otherwhere-xi-death-rites",
  title: "Death Rites",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-mechanic/otherwhere-xi-death-rites",
  facts: [
    {
      fact: "Most Paramese nations burn their dead, lest they rise as revenants.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Farewell rites are pyres, then a ceremony spreading the ashes.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Priests of Neriad and Enttiku speak at funeral pyres.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A prayer to Neriad or Enttiku over the dead keeps them from rising.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Village graves are carved with Enttiku's symbols.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Vizimans leave the bodies of foes far from the deadlands.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "After battle, guards walk the field so the dead cannot rise.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Army camps light pyres every night during a war.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "People speak of waiting for loved ones in the afterlife.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
