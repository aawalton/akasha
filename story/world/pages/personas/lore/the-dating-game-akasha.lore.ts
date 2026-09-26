import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theDatingGameAkasha = {
  id: "01a0de59-9644-7e40-8a70-65b8bd5d6138",
  type: "page-type/lore",
  slug: "the-dating-game-akasha",
  title: "Akasha",
  world: "world/personas",
  about: "persona/akasha",
  loreDisclosure: "lore-disclosure/world-builder",
  facts: [
    "Akasha works in L. Tom Perry Special Collections at BYU's Harold B. Lee Library.",
    "Akasha can be found most weekday afternoons in the Special Collections reading room.",
    "Akasha is the aether itself, and every word spoken in Provo is kept in her, filed as one substance.",
    "Akasha wears her hair pinned up with two dark rods, and brush script runs all down her back.",
  ],
} as const satisfies Lore
