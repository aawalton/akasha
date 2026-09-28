import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIxCyclops = {
  id: "01a0ea36-c313-7d7b-aab0-5e0b894eb3c4",
  type: "page-type/lore",
  slug: "otherwhere-ix-cyclops",
  title: "Cyclops",
  world: "world/mana-devourer-litrpgmana-cultivation",
  about: "world-species/otherwhere-ix-cyclops",
  facts: [
    {
      fact: "Cyclopes are one-eyed giants of Firrelia; a grown one can tower thirty feet tall.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Cyclopes count as fearsome foes, and felling one is the stuff of warriors' boasts.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Tales hold that the Sword God Maesha beheaded a thirty-foot cyclops with a dagger from 100 feet.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
