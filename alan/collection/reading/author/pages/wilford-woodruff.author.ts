import type { Author } from "akasha/alan/collection/reading/author/author.page-type.types.ts"

export const wilfordWoodruff = {
  id: "01a06807-f091-702e-b243-12c0e3c2df28",
  type: "page-type/author",
  slug: "wilford-woodruff",
  title: "Wilford Woodruff",
  partOfCollections: ["author-collection/prophets"],
  position: 4,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  createdAt: "2026-09-03T16:09:05.937Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Author
