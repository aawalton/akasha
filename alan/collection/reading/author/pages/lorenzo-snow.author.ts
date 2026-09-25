import type { Author } from "akasha/alan/collection/reading/author/author.page-type.types.ts"

export const lorenzoSnow = {
  id: "01a06807-f091-7024-a738-da829b2cd954",
  type: "page-type/author",
  slug: "lorenzo-snow",
  title: "Lorenzo Snow",
  partOfCollections: ["author-collection/prophets"],
  position: 5,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
} as const satisfies Author
