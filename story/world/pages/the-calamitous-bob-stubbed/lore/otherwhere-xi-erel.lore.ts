import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiErel = {
  id: "01a0ea81-c5cd-7145-9fef-67115cf623c6",
  type: "page-type/lore",
  slug: "otherwhere-xi-erel",
  title: "Erel",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-erel",
  facts: [
    {
      fact: "Erel is a commoner of New Harrak.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Erel has a sister who was badly burned.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Erel is thought to live in New Harrak still this season.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
