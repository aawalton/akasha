import type { Author } from "akasha/alan/collection/reading/author/author.page-type.types.ts"

export const charlesDickens = {
  id: "01a06807-f091-7003-bb8e-3234bce0dbd5",
  type: "page-type/author",
  slug: "charles-dickens",
  title: "Charles Dickens",
  partOfCollections: ["author-collection/classics-authors"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
} as const satisfies Author
