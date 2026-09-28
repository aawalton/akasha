import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIxIgnoa = {
  id: "01a0ea36-9033-7e5f-919f-21c1edb8d7d7",
  type: "page-type/lore",
  slug: "otherwhere-ix-ignoa",
  title: "Ignoa",
  world: "world/mana-devourer-litrpgmana-cultivation",
  about: "world-character/otherwhere-ix-ignoa",
  facts: [
    {
      fact: "Ignoa is a Firrelian god who became irrelevant after his temples were destroyed.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Some still worship Ignoa, and are called Ignoan.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Randall despises Ignoa's worshippers and uses Ignoan as a slur.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The family of Randall's altok acolyte was once pledged to Ignoa.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In this season Ignoa has no temples and little worship; where he is and what he does is unknown.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
