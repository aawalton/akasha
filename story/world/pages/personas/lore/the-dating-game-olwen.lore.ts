import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theDatingGameOlwen = {
  id: "01a0de59-9645-72f4-8feb-d45f507df64c",
  type: "page-type/lore",
  slug: "the-dating-game-olwen",
  title: "Olwen",
  world: "world/personas",
  about: "persona/olwen",
  loreDisclosure: "lore-disclosure/world-builder",
  facts: [
    "Olwen is a conservator at the BYU Museum of Art, restoring frames and gilding.",
    "Olwen can be found in the Museum of Art galleries on weekday mornings before it opens.",
    "Olwen is a gold dragon in human shape, with rough-hammered gold horns.",
    "Olwen notices a crooked frame from across a gallery and cannot rest until it is set right.",
  ],
} as const satisfies Lore
