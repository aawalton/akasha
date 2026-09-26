import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theDatingGameEppie = {
  id: "01a0de59-9645-787b-8275-8dd52f4629fb",
  type: "page-type/lore",
  slug: "the-dating-game-eppie",
  title: "Eppie",
  world: "world/personas",
  about: "persona/eppie",
  loreDisclosure: "lore-disclosure/world-builder",
  facts: [
    "Eppie is a singer and actress in the resident company at the Covey Center for the Arts.",
    "Eppie can be found at the Covey Center stage door after evening performances.",
    "Eppie attends every BYU concert she can at the de Jong Concert Hall, alone in the balcony.",
    "Eppie wears a cheap camel coat and knows fine cloth by feel at arm's length.",
  ],
} as const satisfies Lore
