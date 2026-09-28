import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIxStewardMarley = {
  id: "01a0ea3f-a3e9-7411-a876-4993e732c94e",
  type: "page-type/lore",
  slug: "otherwhere-ix-steward-marley",
  title: "Steward Marley",
  world: "world/mana-devourer-litrpgmana-cultivation",
  about: "world-character/otherwhere-ix-steward-marley",
  facts: [
    {
      fact: "Marley is steward and chief aide to Baron Samell Toth of Malari.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Marley served Toth's father before Toth, and is coldly pragmatic.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Marley speaks courtly, and calls Toth my lord.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Marley wears the emerald Ring of Control that controls Toth's creature.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Marley oversees Lisa and the serving staff, and speaks of the court enchanter.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Marley is at Toth's castle, with the ring on his hand.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
