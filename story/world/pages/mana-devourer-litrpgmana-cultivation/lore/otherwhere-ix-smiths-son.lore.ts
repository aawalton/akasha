import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIxSmithsSon = {
  id: "01a0ea3b-5154-754e-8e6e-4035641444d2",
  type: "page-type/lore",
  slug: "otherwhere-ix-smiths-son",
  title: "The Blacksmith's Son",
  world: "world/mana-devourer-litrpgmana-cultivation",
  about: "world-character/otherwhere-ix-smiths-son",
  facts: [
    {
      fact: "The blacksmith's son is a young boar-man, skinnier than his father, who minds the forge.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The smith's son is anxious and red-eyed from the forge smoke.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The smith sends his son home when he goes drinking at the tavern.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season the smith's son works his father's forge beneath the arena.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
