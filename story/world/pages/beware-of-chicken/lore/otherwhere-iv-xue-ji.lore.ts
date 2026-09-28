import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIvXueJi = {
  id: "01a0ea12-36b2-7a52-bddc-eb3020758c96",
  type: "page-type/lore",
  slug: "otherwhere-iv-xue-ji",
  title: "Xue Ji",
  world: "world/beware-of-chicken",
  facts: [
    {
      fact: "Xue Ji is a Su Clan fox woman on the Verdant Hill Lord Magistrate's staff.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Xue Ji plans supply routes for the Magistrate's retinue and later serves as his bodyguard.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This spring Xue Ji travels south with the Magistrate, Lady Wu and Jin's party.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Xue Ji helps look after Jin and Meiling's son Zhuye on the road.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
