import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIxChameleonPotion = {
  id: "01a0ea3f-fe98-7ea7-81c6-d0727eb1941e",
  type: "page-type/lore",
  slug: "otherwhere-ix-chameleon-potion",
  title: "Chameleon Potion",
  world: "world/mana-devourer-litrpgmana-cultivation",
  about: "world-item/otherwhere-ix-chameleon-potion",
  facts: [
    {
      fact: "Half a bottle of chameleon potion makes the drinker blend in with their surroundings.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A full bottle of chameleon potion renders the drinker almost invisible.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Chameleon potions are rare and hard to make.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "An old chameleon potion may have lost its power.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Four old chameleon potions lay in a chest in the Sun City arena depths.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Of those four, the imp Abrah took two, one to sell and one to keep; Markus Brown kept two.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
