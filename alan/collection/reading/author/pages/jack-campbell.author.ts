import type { Author } from "akasha/alan/collection/reading/author/author.page-type.types.ts"

export const jackCampbell = {
  id: "01a06807-f091-7017-9dc0-1d2e03b59b6a",
  type: "page-type/author",
  slug: "jack-campbell",
  title: "Jack Campbell",
  partOfCollections: ["author-collection/science-fiction-authors"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
} as const satisfies Author
