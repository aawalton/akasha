import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiPrayer = {
  id: "01a0ea83-0cf6-781b-8ab1-543654234cd0",
  type: "page-type/lore",
  slug: "otherwhere-xi-prayer",
  title: "Prayer",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-mechanic/otherwhere-xi-prayer",
  facts: [
    {
      fact: "In prayer the one praying feels the god's presence, and emotions come back through the link.",
      knowers: ["lore-disclosure/game-master"],
    },
    { fact: "Few archmages have ever prayed.", knowers: ["lore-disclosure/game-master"] },
    {
      fact: "Village shrines to the light gods are simple carved statues where a presence is felt.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A god's holy symbol carved even on a tree stump can be prayed to.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A new statue of a god is consecrated with prayer and an offering of mana.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Rulers traditionally spend the eve of their coronation praying in a temple.",
      knowers: ["lore-disclosure/game-master"],
    },
    { fact: "Most folk attend temple each week.", knowers: ["lore-disclosure/game-master"] },
    {
      fact: "A flippant prayer may be answered with a divine rebuke to take it seriously.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A prayer for judgment may be answered by a god's light, as a golden halo for Neriad.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Soldiers raise uninscribed war shrines even where no god is named.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
