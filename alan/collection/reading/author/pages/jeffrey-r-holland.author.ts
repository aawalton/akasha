import type { Author } from "akasha/alan/collection/reading/author/author.page-type.types.ts"

export const jeffreyRHolland = {
  id: "01a06807-f091-701a-852a-8bb2f9feeb23",
  type: "page-type/author",
  slug: "jeffrey-r-holland",
  title: "Jeffrey R. Holland",
  partOfCollections: ["author-collection/apostles"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
} as const satisfies Author
