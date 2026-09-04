import type { Author } from "../author.page-type.ts"

export const josephFSmith = {
  id: "01a06807-f091-701e-a223-024373fed4ef",
  pageTypeSlug: "author",
  slug: "joseph-f-smith",
  title: "Joseph F. Smith",
  partOfSlugs: ["prophets"],
  position: 6,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies Author
