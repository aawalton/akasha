import type { Author } from "akasha/alan/collection/reading/author/author.page-type.types.ts"

export const cSLewis = {
  id: "01a06807-f091-7002-bfdd-29359cc03b97",
  type: "page-type/author",
  slug: "c-s-lewis",
  title: "C. S. Lewis",
  partOfCollections: ["author-collection/faith-authors"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
} as const satisfies Author
