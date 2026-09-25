import type { Author } from "akasha/alan/collection/reading/author/author.page-type.types.ts"

export const danielSuarez = {
  id: "01a06807-f091-7007-8f00-f7de4bc45bb8",
  type: "page-type/author",
  slug: "daniel-suarez",
  title: "Daniel Suarez",
  partOfCollections: ["author-collection/science-fiction-authors"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
} as const satisfies Author
