import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiGriswel = {
  id: "01a0ea85-3eb0-73d4-b89f-967e1e76370d",
  type: "page-type/lore",
  slug: "otherwhere-xi-griswel",
  title: "Griswel",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-griswel",
  facts: [
    {
      fact: "Griswel is a villager of a frontier village at the Deadshield's northern edge in Enoria.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Griswel lived through the spider siege of his village by Octas' herald years ago.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Griswel is thought to live in that village still.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
