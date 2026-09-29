import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXPellHollis = {
  id: "01a0ead5-96f5-78c4-8827-3092607cb682",
  type: "page-type/lore",
  slug: "otherwhere-x-pell-hollis",
  title: "Pell Hollis",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  about: "world-character/otherwhere-x-pell-hollis",
  facts: [
    {
      fact: "Pell Hollis keeps the mill on Harrow Brook and carts barley to Wexley market each fifth day.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Pell is shrewd and friendly, buys anything odd, and gossips at every market.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Pell is forty, flour-dusted and cheerful, with a wife and four children.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Pell would trade for a strange thing first and ask where it came from second.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Pell charges a tenth of the grain he mills and takes it in kind.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Pell's cart is the fastest way for a stranger to leave Harrow unseen.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
