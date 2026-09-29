import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiLissho = {
  id: "01a0ea8f-a12c-72c4-8854-3bb8ecba375e",
  type: "page-type/lore",
  slug: "otherwhere-xi-lissho",
  title: "Captain Lis'sho",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-lissho",
  facts: [
    {
      fact: "Captain Lis'sho was one of the leaders of Oleander's Kingdom of Maranor in the final war.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Lis'sho's fate after the rout on the Plain of the Gods is unknown.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
