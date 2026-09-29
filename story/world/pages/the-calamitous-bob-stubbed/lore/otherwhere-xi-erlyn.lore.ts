import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiErlyn = {
  id: "01a0ea90-86db-705c-a5c5-cd929e63a707",
  type: "page-type/lore",
  slug: "otherwhere-xi-erlyn",
  title: "Erlyn",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-erlyn",
  facts: [
    {
      fact: "Erlyn is one of the Enorians of King Sangor's party at the Mornyr summit.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Where Erlyn is this season is unknown; Erlyn is thought to be in Enoria.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
