import type { Author } from "akasha/alan/collection/reading/author/author.page-type.types.ts"

export const davidOMckay = {
  id: "01a06807-f091-700a-9d72-d2b21be3345d",
  type: "page-type/author",
  slug: "david-o-mckay",
  title: "David O. McKay",
  partOfCollections: ["author-collection/prophets"],
  position: 9,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  createdAt: "2026-09-03T16:09:05.937Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Author
