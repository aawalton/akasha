import type { Author } from "akasha/alan/collection/reading/author/author.page-type.types.ts"

export const elizabethMoon = {
  id: "01a06807-f091-700d-8cbe-5d617347ad60",
  type: "page-type/author",
  slug: "elizabeth-moon",
  title: "Elizabeth Moon",
  partOfCollections: ["author-collection/science-fiction-authors"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
} as const satisfies Author
