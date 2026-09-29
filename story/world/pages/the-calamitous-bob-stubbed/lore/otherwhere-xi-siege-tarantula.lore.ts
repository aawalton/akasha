import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiSiegeTarantula = {
  id: "01a0ea7f-9f47-7ff7-80c9-e5f2475fb183",
  type: "page-type/lore",
  slug: "otherwhere-xi-siege-tarantula",
  title: "Siege Tarantula",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-species/otherwhere-xi-siege-tarantula",
  facts: [
    {
      fact: "A siege tarantula is an armoured giant spider with a ram-like head.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A siege tarantula has black-and-white legs and weighs some three tons.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A siege tarantula batters down walls and palisades with its head.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Siege tarantulas are found in the great spider nests of the Deadshield Woods.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
