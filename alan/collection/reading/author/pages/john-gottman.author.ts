import type { Author } from "akasha/alan/collection/reading/author/author.page-type.types.ts"

export const johnGottman = {
  id: "01a06807-f091-701c-9b44-c72bb0c8bcff",
  type: "page-type/author",
  slug: "john-gottman",
  title: "John Gottman",
  partOfCollections: ["author-collection/non-fiction-authors"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "in-progress",
  grade: "A",
  createdAt: "2026-09-03T16:09:05.937Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Author
