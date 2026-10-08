import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIiRizzen = {
  id: "01a0e9c7-1b29-721e-9833-cd6aa5043788",
  type: "page-type/lore",
  slug: "otherwhere-ii-rizzen",
  title: "Rizzen",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Rizzen is the builder and absolute ruler of the tower that bears his name.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "His tower's motto reads: May your species prosper and serve the glory of Rizzen.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
  createdAt: "2026-09-28T20:48:55.081Z",
  updatedAt: "2026-09-28T22:36:35.000Z",
} as const satisfies Lore
