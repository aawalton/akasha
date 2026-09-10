import type { Author } from "../author.page-type.types.ts"

export const josephSmith = {
  id: "01a06807-f091-7020-bd2d-cee2a9b09e41",
  pageTypeSlug: "author",
  type: "author",
  slug: "joseph-smith",
  title: "Joseph Smith",
  partOfCollections: ["prophets"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
} as const satisfies Author
