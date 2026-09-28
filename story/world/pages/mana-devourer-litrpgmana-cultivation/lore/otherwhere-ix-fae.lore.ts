import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIxFae = {
  id: "01a0ea34-d6f3-7b2f-a5fc-5e402d35177b",
  type: "page-type/lore",
  slug: "otherwhere-ix-fae",
  title: "Fae",
  world: "world/mana-devourer-litrpgmana-cultivation",
  about: "world-species/otherwhere-ix-fae",
  facts: [
    {
      fact: "The fae are a mortal folk of Firrelia, humanlike enough in shape to walk among humans.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A fae can rise to godhood by taking up a Divine Arm; e.g. the Sword God Maesha was born fae.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Disciples of such a god may sneer at her in private as “a jumped up fae”.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Most Firrelians rank a mere fae far below a natural-born god from a higher world.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
