import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiRenea = {
  id: "01a0ea84-282d-76f8-809f-6f0a2cb4047f",
  type: "page-type/lore",
  slug: "otherwhere-xi-renea",
  title: "Renea",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-renea",
  facts: [
    {
      fact: "Renea, also Renata, is a mage who once served the archmage Elunath.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Renea comes from a poor family of coal-makers near Helock.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Renea was Elunath's loyalist and snitch; after his death the others beat and shaved her.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Renea later warned Viv of danger at the Azure Lady's haven.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Renea is guilt-ridden, and Lana the Tide-Weaver has forgiven her.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Renea lives in World's End, the free city of the mage exiles.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
