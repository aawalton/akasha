import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIxElundite = {
  id: "01a0ea40-bcb6-71ee-85a0-8f95d8883fae",
  type: "page-type/lore",
  slug: "otherwhere-ix-elundite",
  title: "Elundite",
  world: "world/mana-devourer-litrpgmana-cultivation",
  about: "world-item/otherwhere-ix-elundite",
  facts: [
    {
      fact: "Elundite is also called silent sky.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Elundite comes from partly eroded ore on high mountain cliffs.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Lightning strikes, wind and hail batter those cliffs and make the ore light and flexible.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Elundite is forged in the high mountains where its ore is found.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Elundite is superior to steel in almost every way.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A piece of elundite lay in an old chest in the Sun City arena depths.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
