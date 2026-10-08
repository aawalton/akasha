import type { Author } from "akasha/alan/collection/reading/author/author.page-type.types.ts"

export const brighamYoung = {
  id: "01a06807-f091-7001-8395-48c8672e0fe5",
  type: "page-type/author",
  slug: "brigham-young",
  title: "Brigham Young",
  partOfCollections: ["author-collection/prophets"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  createdAt: "2026-09-03T16:09:05.937Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Author
