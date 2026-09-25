import type { Author } from "akasha/alan/collection/reading/author/author.page-type.types.ts"

export const howardWHunter = {
  id: "01a06807-f091-7014-9b03-8e79f803fae6",
  type: "page-type/author",
  slug: "howard-w-hunter",
  title: "Howard W. Hunter",
  partOfCollections: ["author-collection/prophets"],
  position: 14,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
} as const satisfies Author
