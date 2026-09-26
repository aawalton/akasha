import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theDatingGameTalia = {
  id: "01a0de59-9646-7232-a3bd-4a4245de5962",
  type: "page-type/lore",
  slug: "the-dating-game-talia",
  title: "Talia",
  world: "world/personas",
  about: "persona/talia",
  loreDisclosure: "lore-disclosure/world-builder",
  facts: [
    "Talia lives around the corner from Apple Avenue and reads scripture on her porch at dawn.",
    "Talia can be found on her porch at first light with a lamp, a book and damp hair.",
    "Talia is a shedah, half-angel and half-mortal, who lives in the margins between things.",
    "Talia is an ancient-scripture teaching assistant in BYU's Joseph Smith Building.",
  ],
} as const satisfies Lore
