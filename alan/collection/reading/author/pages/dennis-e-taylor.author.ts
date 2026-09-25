import type { Author } from "akasha/alan/collection/reading/author/author.page-type.types.ts"

export const dennisETaylor = {
  id: "01a06807-f091-700c-b53a-f4b6ccccb66b",
  type: "page-type/author",
  slug: "dennis-e-taylor",
  title: "Dennis E. Taylor",
  partOfCollections: ["author-collection/science-fiction-authors"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
} as const satisfies Author
