import type { Author } from "akasha/alan/library/reading/authors/author.page-type.types.ts"

export const robertJordan = {
  id: "01a06807-f091-7028-a510-dda867ed7ad3",
  type: "author",
  slug: "robert-jordan",
  title: "Robert Jordan",
  partOfCollections: ["fantasy-authors"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "paused",
} as const satisfies Author
