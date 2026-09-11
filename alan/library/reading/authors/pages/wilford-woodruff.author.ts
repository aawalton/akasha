import type { Author } from "akasha/alan/library/reading/authors/author.page-type.types.ts"

export const wilfordWoodruff = {
  id: "01a06807-f091-702e-b243-12c0e3c2df28",
  type: "author",
  slug: "wilford-woodruff",
  title: "Wilford Woodruff",
  partOfCollections: ["prophets"],
  position: 4,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
} as const satisfies Author
