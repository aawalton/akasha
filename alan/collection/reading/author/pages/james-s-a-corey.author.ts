import type { Author } from "akasha/alan/collection/reading/author/author.page-type.types.ts"

export const jamesSACorey = {
  id: "01a06807-f091-7018-8619-b094696da82a",
  type: "page-type/author",
  slug: "james-s-a-corey",
  title: "James S. A. Corey",
  partOfCollections: ["author-collection/science-fiction-authors"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
} as const satisfies Author
