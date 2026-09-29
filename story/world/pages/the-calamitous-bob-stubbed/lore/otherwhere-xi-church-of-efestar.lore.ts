import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiChurchOfEfestar = {
  id: "01a0ea81-300a-7387-b80a-8fb609ee1d1b",
  type: "page-type/lore",
  slug: "otherwhere-xi-church-of-efestar",
  title: "The Church of Efestar",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-religion/otherwhere-xi-church-of-efestar",
  facts: [
    {
      fact: "A clergy of Efestar has grown in Harrak since his redemption.",
      knowers: ["lore-disclosure/game-master"],
    },
    { fact: "There is a church of Efestar in Kazar.", knowers: ["lore-disclosure/game-master"] },
    {
      fact: "Efestar's complex by Sinur's Gate keeps isolation and gardens of volcanic stone.",
      knowers: ["lore-disclosure/game-master"],
    },
    { fact: "The Church of Efestar has no bishops yet.", knowers: ["lore-disclosure/game-master"] },
    { fact: "Converts of Efestar wear black cowls.", knowers: ["lore-disclosure/game-master"] },
    {
      fact: "Efestar's clergy bless those who seek a second chance.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Efestar's clergy teach talking points on second chances, used even in diplomacy.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A Harrakan ship is named Efestar's Redemption.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
