import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiSen = {
  id: "01a0ea86-00cd-7512-9a7f-d9dca45ca3be",
  type: "page-type/lore",
  slug: "otherwhere-xi-sen",
  title: "Sen",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-sen",
  facts: [
    {
      fact: "Sen is a tall northern woman, once bound in service to the archmage Elunath.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "When Elunath died, Sen left with most of his women and took his coin.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Sen's whereabouts are her own; she went her way long ago.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
