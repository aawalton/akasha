import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiLydia = {
  id: "01a0ea90-86db-744d-bbc7-747250aa1f25",
  type: "page-type/lore",
  slug: "otherwhere-xi-lydia",
  title: "Lydia",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-lydia",
  facts: [
    {
      fact: "Lydia is one of the Enorians of King Sangor's party at the Mornyr summit.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Where Lydia is this season is unknown; she is thought to be in Enoria.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
