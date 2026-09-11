import type { Author } from "akasha/alan/library/reading/authors/author.page-type.types.ts"

export const davidOMckay = {
  id: "01a06807-f091-700a-9d72-d2b21be3345d",
  type: "author",
  slug: "david-o-mckay",
  title: "David O. McKay",
  partOfCollections: ["prophets"],
  position: 9,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
} as const satisfies Author
