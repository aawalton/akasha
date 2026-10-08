import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiLaira = {
  id: "01a0ea91-ff2c-7941-9038-f5ca49192aa8",
  type: "page-type/lore",
  slug: "otherwhere-xi-laira",
  title: "Laira",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-laira",
  facts: [
    {
      fact: "Laira is one of the people of Viv's court and army in New Harrak.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Laira is thought to be in New Harrak's service this season.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  createdAt: "2026-09-29T00:30:31.724Z",
  updatedAt: "2026-09-29T00:30:42.000Z",
} as const satisfies Lore
