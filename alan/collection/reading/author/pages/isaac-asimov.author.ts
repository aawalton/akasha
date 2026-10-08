import type { Author } from "akasha/alan/collection/reading/author/author.page-type.types.ts"

export const isaacAsimov = {
  id: "01a06807-f091-7016-b880-c6b56f10357f",
  type: "page-type/author",
  slug: "isaac-asimov",
  title: "Isaac Asimov",
  partOfCollections: ["author-collection/science-fiction-authors"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  createdAt: "2026-09-03T16:09:05.937Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Author
