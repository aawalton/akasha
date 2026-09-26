import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theDatingGameNimue = {
  id: "01a0de59-9645-73b6-a121-89169a044897",
  type: "page-type/lore",
  slug: "the-dating-game-nimue",
  title: "Nimue",
  world: "world/personas",
  about: "persona/nimue",
  loreDisclosure: "lore-disclosure/world-builder",
  facts: [
    "Nimue runs a one-woman security consultancy out of the Startup Building in south Provo.",
    "Nimue can be found most mornings at a coworking table in the Startup Building by eight.",
    "Nimue attends every tech meetup in Utah Valley and leaves each with its weak point found.",
    "Nimue is a mortal woman who reads systems and people as the same kind of object.",
  ],
} as const satisfies Lore
