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
} as const satisfies Author
