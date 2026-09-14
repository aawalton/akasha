import type { Author } from "akasha/alan/library/reading/authors/author.page-type.types.ts"

export const danBrown = {
  id: "01a06807-f091-7005-99a3-b9b3592c2280",
  type: "author",
  slug: "dan-brown",
  title: "Dan Brown",
  partOfCollections: ["author-collection/thriller-authors"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
} as const satisfies Author
