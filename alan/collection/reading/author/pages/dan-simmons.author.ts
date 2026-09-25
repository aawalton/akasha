import type { Author } from "akasha/alan/collection/reading/author/author.page-type.types.ts"

export const danSimmons = {
  id: "01a06807-f091-7006-8c56-73887f171e9d",
  type: "page-type/author",
  slug: "dan-simmons",
  title: "Dan Simmons",
  partOfCollections: ["author-collection/science-fiction-authors"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
} as const satisfies Author
