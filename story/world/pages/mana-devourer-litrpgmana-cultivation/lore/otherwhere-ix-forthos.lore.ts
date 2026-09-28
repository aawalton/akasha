import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIxForthos = {
  id: "01a0ea39-281e-7c0e-ab4f-4fe77bc31f3c",
  type: "page-type/lore",
  slug: "otherwhere-ix-forthos",
  title: "Forthos",
  world: "world/mana-devourer-litrpgmana-cultivation",
  about: "world-mechanic/otherwhere-ix-forthos",
  facts: [
    {
      fact: "Forthos is the fourth world.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "On Forthos kraken meat is one of the costliest delicacies, served at lavish parties.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Tetricite comes from the fourth world: a glinting, light metal of great durability.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Tetricite conducts lightning well.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
