import type { Author } from "akasha/alan/collection/reading/author/author.page-type.types.ts"

export const jamesWhite = {
  id: "01a06807-f091-7019-b748-4b625ff43a47",
  type: "page-type/author",
  slug: "james-white",
  title: "James White",
  partOfCollections: ["author-collection/science-fiction-authors"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
} as const satisfies Author
