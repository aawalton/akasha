import type { Author } from "akasha/alan/collection/reading/author/author.page-type.types.ts"

export const willWight = {
  id: "01a06807-f091-702f-9fce-bd7769cc18a4",
  type: "page-type/author",
  slug: "will-wight",
  title: "Will Wight",
  partOfCollections: ["author-collection/fantasy-authors"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
} as const satisfies Author
