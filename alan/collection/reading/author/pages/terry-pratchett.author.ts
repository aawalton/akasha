import type { Author } from "akasha/alan/collection/reading/author/author.page-type.types.ts"

export const terryPratchett = {
  id: "01a06807-f091-702b-8b9a-1fd5b59e72b1",
  type: "page-type/author",
  slug: "terry-pratchett",
  title: "Terry Pratchett",
  partOfCollections: ["author-collection/fantasy-authors"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
} as const satisfies Author
