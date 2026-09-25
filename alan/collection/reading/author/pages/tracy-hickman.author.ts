import type { Author } from "akasha/alan/collection/reading/author/author.page-type.types.ts"

export const tracyHickman = {
  id: "01a06807-f091-702d-8e28-eaedc449e259",
  type: "page-type/author",
  slug: "tracy-hickman",
  title: "Tracy Hickman",
  partOfCollections: ["author-collection/fantasy-authors"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
} as const satisfies Author
