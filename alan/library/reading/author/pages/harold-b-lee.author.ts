import type { Author } from "akasha/alan/library/reading/author/author.page-type.types.ts"

export const haroldBLee = {
  id: "01a06807-f091-7012-a9a2-441545651234",
  type: "author",
  slug: "harold-b-lee",
  title: "Harold B. Lee",
  partOfCollections: ["author-collection/prophets"],
  position: 11,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
} as const satisfies Author
