import type { Author } from "akasha/alan/collection/reading/author/author.page-type.types.ts"

export const robertJordan = {
  id: "01a06807-f091-7028-a510-dda867ed7ad3",
  type: "page-type/author",
  slug: "robert-jordan",
  title: "Robert Jordan",
  partOfCollections: ["author-collection/fantasy-authors"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "paused",
} as const satisfies Author
