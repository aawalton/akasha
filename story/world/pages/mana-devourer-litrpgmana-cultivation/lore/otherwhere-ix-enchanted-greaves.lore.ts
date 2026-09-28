import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIxEnchantedGreaves = {
  id: "01a0ea42-c3b8-7bed-a115-57d8e70ed1a8",
  type: "page-type/lore",
  slug: "otherwhere-ix-enchanted-greaves",
  title: "Enchanted Greaves",
  world: "world/mana-devourer-litrpgmana-cultivation",
  about: "world-item/otherwhere-ix-enchanted-greaves",
  facts: [
    {
      fact: "The greaves look like armguards, but Identify names them metal greaves.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "They hold Mystic Mana and a second mana of unknown kind.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Their lightness enchantment makes falls safer and the wearer slightly faster.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The enchantment wears off and must be renewed by an enchanter.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Drawing the mana out of them would break the part that lets them hold magic.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Imbuing them with fresh mana could break the enchantment.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "They lay in a large chest in the Sun City arena depths.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
