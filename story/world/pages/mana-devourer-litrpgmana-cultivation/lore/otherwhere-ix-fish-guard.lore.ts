import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIxFishGuard = {
  id: "01a0ea40-95f3-793d-938a-d64b2783d1b7",
  type: "page-type/lore",
  slug: "otherwhere-ix-fish-guard",
  title: "The Fish-Folk Cell Guard",
  world: "world/mana-devourer-litrpgmana-cultivation",
  about: "world-character/otherwhere-ix-fish-guard",
  facts: [
    {
      fact: "The cell guard is a huge, bipedal fish creature who patrols Markus Brown's cell block.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The fish guard carries a nightstick and bangs it on the cell bars.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "When Cyrus blurted that he was plotting an escape, the fish guard laughed it off.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Guards rarely pass through the long cell blocks, and the fish guard is no exception.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season the fish guard walks the cell blocks beneath the arena.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
