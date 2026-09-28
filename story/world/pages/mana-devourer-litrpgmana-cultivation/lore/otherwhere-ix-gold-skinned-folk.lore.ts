import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIxGoldSkinnedFolk = {
  id: "01a0ea35-942e-7c39-a1fe-7093a161fcab",
  type: "page-type/lore",
  slug: "otherwhere-ix-gold-skinned-folk",
  title: "Gold-skinned folk",
  world: "world/mana-devourer-litrpgmana-cultivation",
  about: "world-species/otherwhere-ix-gold-skinned-folk",
  facts: [
    {
      fact: "The gold-skinned folk are a stout, short-built people with skin the color of gold.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Their kind has no common name among outsiders, who know them by their gold skin.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Gold-skinned women work and drink in the tavern across from the smithy under the arena.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
