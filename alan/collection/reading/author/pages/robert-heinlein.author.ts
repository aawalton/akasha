import type { Author } from "akasha/alan/collection/reading/author/author.page-type.types.ts"

export const robertHeinlein = {
  id: "01a06807-f091-7027-8d18-ab2da0936b58",
  type: "page-type/author",
  slug: "robert-heinlein",
  title: "Robert Heinlein",
  partOfCollections: ["author-collection/science-fiction-authors"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  createdAt: "2026-09-03T16:09:05.937Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Author
