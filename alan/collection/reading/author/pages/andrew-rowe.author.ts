import type { Author } from "akasha/alan/collection/reading/author/author.page-type.types.ts"

export const andrewRowe = {
  id: "01a06807-f090-7002-9948-3011bcd9b03d",
  type: "page-type/author",
  slug: "andrew-rowe",
  title: "Andrew Rowe",
  partOfCollections: ["author-collection/fantasy-authors"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
} as const satisfies Author
