import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiLeit = {
  id: "01a0ea8f-07e4-7234-a6a1-602ad7aa9b2e",
  type: "page-type/lore",
  slug: "otherwhere-xi-leit",
  title: "Master Leit",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-leit",
  facts: [
    {
      fact: "Master Leit is a captain-merchant of the shipping guild, master of the river ship River Flower.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Leit carried Viv and Sidjin down the River Shal from Losserec toward Helock.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The shipping guild disciplined Leit after the voyage's ambush and chase at Markeis.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Where Leit is this season is unknown.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
