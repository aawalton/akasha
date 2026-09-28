import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIxCiphelos = {
  id: "01a0ea35-dfa7-744f-a2f3-22a27feb7b7d",
  type: "page-type/lore",
  slug: "otherwhere-ix-ciphelos",
  title: "Ciphelos",
  world: "world/mana-devourer-litrpgmana-cultivation",
  about: "world-character/otherwhere-ix-ciphelos",
  facts: [
    {
      fact: "Ciphelos is a Firrelian god, said to be more lenient with servants than the others.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Drathok says Ciphelos might free a servant after a few decades of service.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Ciphelos is friendly toward Drathok and does not mind demons.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Drathok urged Markus Brown to sign himself over to Ciphelos; Markus did not.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In this season Ciphelos has not shown himself openly; his doings are unknown.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
