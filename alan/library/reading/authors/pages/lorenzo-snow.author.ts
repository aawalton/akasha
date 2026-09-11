import type { Author } from "akasha/alan/library/reading/authors/author.page-type.types.ts"

export const lorenzoSnow = {
  id: "01a06807-f091-7024-a738-da829b2cd954",
  type: "author",
  slug: "lorenzo-snow",
  title: "Lorenzo Snow",
  partOfCollections: ["prophets"],
  position: 5,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
} as const satisfies Author
