import type { Author } from "../author.page-type.ts"

export const josephSmith = {
  id: "01a06807-f091-7020-bd2d-cee2a9b09e41",
  pageTypeSlug: "author",
  slug: "joseph-smith",
  title: "Joseph Smith",
  partOfSlugs: ["prophets"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies Author
