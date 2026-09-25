import type { Author } from "akasha/alan/collection/reading/author/author.page-type.types.ts"

export const melanieCellier = {
  id: "01a06807-f091-7026-bb6d-58c52b07c138",
  type: "page-type/author",
  slug: "melanie-cellier",
  title: "Melanie Cellier",
  partOfCollections: ["author-collection/fantasy-authors"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
} as const satisfies Author
