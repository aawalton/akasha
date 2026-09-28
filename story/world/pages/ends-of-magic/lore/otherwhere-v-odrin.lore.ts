import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVOdrin = {
  id: "01a0e9fd-9171-7f90-9e89-b90e89b6d2e9",
  type: "page-type/lore",
  slug: "otherwhere-v-odrin",
  title: "Odrin",
  world: "world/ends-of-magic",
  about: "world-character/otherwhere-v-odrin",
  facts: [
    {
      fact: "Odrin is a flamboyant Questor in gemstone ruffles, called a master of decoherent noise.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Odrin carries a black stone cane that absorbs mana and wizardry, up to a rate.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Odrin fights with animated strips of magic-resistant fabric and strong voice-borne mental skills.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In this season Odrin plays the Questors' game of renown, far from Elothia.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
