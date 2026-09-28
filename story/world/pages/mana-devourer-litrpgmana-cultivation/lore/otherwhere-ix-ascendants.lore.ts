import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIxAscendants = {
  id: "01a0ea3b-fc33-7d4e-a27c-b2bbe7066877",
  type: "page-type/lore",
  slug: "otherwhere-ix-ascendants",
  title: "Ascendants",
  world: "world/mana-devourer-litrpgmana-cultivation",
  about: "world-mechanic/otherwhere-ix-ascendants",
  facts: [
    {
      fact: "An Ascendant is a mortal powerful enough to ascend to Seconna of their own will.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "An Ascendant is recognised by the Seconnian rulers as worthy to live among them.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Most Firrelians hold Ascendants to be a rumour.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Arena crowds sometimes cry Ascendant at a fighter who rises past all odds.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sun City's arena crowd split between crying Ascendant and Abomination at Markus Brown.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
