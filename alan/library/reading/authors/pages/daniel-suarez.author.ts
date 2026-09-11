import type { Author } from "akasha/alan/library/reading/authors/author.page-type.types.ts"

export const danielSuarez = {
  id: "01a06807-f091-7007-8f00-f7de4bc45bb8",
  type: "author",
  slug: "daniel-suarez",
  title: "Daniel Suarez",
  partOfCollections: ["science-fiction-authors"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
} as const satisfies Author
