import type { AuthorCollection } from "../author-collection.page-type.ts"

export const mysteryAndDetective = {
  id: "01a06808-06b4-7006-ba83-833ff5634100",
  pageTypeSlug: "author-collection",
  type: "author-collection",
  slug: "mystery-and-detective",
  title: "Mystery and Detective",
  partOfCollections: ["authors"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-applicable",
} as const satisfies AuthorCollection
