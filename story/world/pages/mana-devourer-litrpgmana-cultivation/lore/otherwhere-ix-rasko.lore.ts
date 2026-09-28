import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIxRasko = {
  id: "01a0ea37-d782-747d-94fe-e2ccb4af7453",
  type: "page-type/lore",
  slug: "otherwhere-ix-rasko",
  title: "Rasko",
  world: "world/mana-devourer-litrpgmana-cultivation",
  about: "world-species/otherwhere-ix-rasko",
  facts: [
    {
      fact: "Rasko are meat animals; rasko briskets and rasko steaks are prized fare.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The demon kitchen beneath the Sun City arena cooks rasko to order, and it tastes very good.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Cooks ask how it is wanted: which cut, what marinade, how aged, how rare, fried or grilled.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
