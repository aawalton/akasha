import type { Author } from "../author.page-type.ts"

export const lorenzoSnow = {
  id: "01a06807-f091-7024-a738-da829b2cd954",
  pageTypeSlug: "author",
  slug: "lorenzo-snow",
  title: "Lorenzo Snow",
  partOfCollections: ["prophets"],
  position: 5,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
} as const satisfies Author
