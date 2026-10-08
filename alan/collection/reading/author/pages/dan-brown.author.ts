import type { Author } from "akasha/alan/collection/reading/author/author.page-type.types.ts"

export const danBrown = {
  id: "01a06807-f091-7005-99a3-b9b3592c2280",
  type: "page-type/author",
  slug: "dan-brown",
  title: "Dan Brown",
  partOfCollections: ["author-collection/thriller-authors"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  createdAt: "2026-09-03T16:09:05.937Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Author
