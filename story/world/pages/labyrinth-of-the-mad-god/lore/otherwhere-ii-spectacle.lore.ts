import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIiSpectacle = {
  id: "01a0e9c6-337f-7397-bbc4-2b1ab795f854",
  type: "page-type/lore",
  slug: "otherwhere-ii-spectacle",
  title: "Spectacle",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Spectacle is the pantheon's god of arenas, bloodsport and excess.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
