import type { Author } from "../author.page-type.types.ts"

export const jeffreyRHolland = {
  id: "01a06807-f091-701a-852a-8bb2f9feeb23",
  pageTypeSlug: "author",
  type: "author",
  slug: "jeffrey-r-holland",
  title: "Jeffrey R. Holland",
  partOfCollections: ["apostles"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
} as const satisfies Author
