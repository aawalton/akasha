import type { Author } from "akasha/alan/collection/reading/author/author.page-type.types.ts"

export const davidDrake = {
  id: "01a06807-f091-7008-8610-b42c748469ab",
  type: "page-type/author",
  slug: "david-drake",
  title: "David Drake",
  partOfCollections: ["author-collection/science-fiction-authors"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
} as const satisfies Author
