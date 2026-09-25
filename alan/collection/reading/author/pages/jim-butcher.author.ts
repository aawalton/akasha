import type { Author } from "akasha/alan/collection/reading/author/author.page-type.types.ts"

export const jimButcher = {
  id: "01a06807-f091-701b-aa03-5b9535b67921",
  type: "page-type/author",
  slug: "jim-butcher",
  title: "Jim Butcher",
  partOfCollections: ["author-collection/fantasy-authors"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
} as const satisfies Author
