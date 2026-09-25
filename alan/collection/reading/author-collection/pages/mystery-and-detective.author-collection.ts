import type { AuthorCollection } from "akasha/alan/collection/reading/author-collection/author-collection.page-type.types.ts"

export const mysteryAndDetective = {
  id: "01a06808-06b4-7006-ba83-833ff5634100",
  type: "page-type/author-collection",
  slug: "mystery-and-detective",
  title: "Mystery and Detective",
  partOfCollections: ["author-collection/authors"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-applicable",
} as const satisfies AuthorCollection
