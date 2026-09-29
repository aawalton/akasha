import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiKorTheBaleful = {
  id: "01a0ea8b-d300-7ed8-b546-c03171e275ad",
  type: "page-type/lore",
  slug: "otherwhere-xi-kor-the-baleful",
  title: "Kor the Baleful",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-kor-the-baleful",
  facts: [
    {
      fact: "Kor the Baleful was an ancient tyrant of Korrim in the Shaded Lands.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Kor was also called Honeyed-Tongue, Bright Child and Friend Kor.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Kor sacrificed Shahira the Swift, and the elder called the Stone rose against him.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Kor woke the volcano Old Red Light, whose ash fell as far as Harrak's Imperial Ziggurat.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Kor the Baleful died ages ago; his war and the eruption darkened the Shadow Lands for good.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
