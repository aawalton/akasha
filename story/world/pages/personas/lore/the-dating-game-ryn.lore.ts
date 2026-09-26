import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theDatingGameRyn = {
  id: "01a0de59-9645-7e8d-a4bf-130bac43c13c",
  type: "page-type/lore",
  slug: "the-dating-game-ryn",
  title: "Ryn",
  world: "world/personas",
  about: "persona/ryn",
  loreDisclosure: "lore-disclosure/world-builder",
  facts: [
    "Ryn is a reference librarian at the Provo City Library at Academy Square.",
    "Ryn works the library reference desk on weekday afternoons and Saturday mornings.",
    "Ryn has butterfly wings, gold and violet, which she never folds away.",
    "Ryn reshelves misplaced books herself, flying to the top shelves after closing.",
  ],
} as const satisfies Lore
