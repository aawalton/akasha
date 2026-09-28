import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIxRingOfControl = {
  id: "01a0ea41-7fd6-7b8c-8cd4-38decbb41082",
  type: "page-type/lore",
  slug: "otherwhere-ix-ring-of-control",
  title: "Ring of Control",
  world: "world/mana-devourer-litrpgmana-cultivation",
  about: "world-item/otherwhere-ix-ring-of-control",
  secrets: "jsonl",
  facts: [
    {
      fact: "The demon Elasar makes Rings of Control to command the monsters he creates.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A Ring of Control is forged alongside its creature and holds an essence of that monster.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Only Elasar can craft another ring for a creature of his.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A ring-bound creature is fully tame to the wearer and obeys even a snap of the fingers.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Elasar sells each creature with its ring, and the lords of Malari buy them.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Baron Toth's steward Marley wears the emerald ring of the baron's evolving creature.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
