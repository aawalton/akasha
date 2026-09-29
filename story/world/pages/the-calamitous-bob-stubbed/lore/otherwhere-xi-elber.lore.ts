import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiElber = {
  id: "01a0ea80-8c26-7d40-a960-9af2502cef05",
  type: "page-type/lore",
  slug: "otherwhere-xi-elber",
  title: "Elber",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-elber",
  facts: [
    {
      fact: "Elber is the man Ser Rollo, master of the Blue Rose knights, came to love late in life.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Where Elber is this season is unknown.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
