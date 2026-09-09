import type { Author } from "../author.page-type.ts"

export const josephFSmith = {
  id: "01a06807-f091-701e-a223-024373fed4ef",
  pageTypeSlug: "author",
  type: "author",
  slug: "joseph-f-smith",
  title: "Joseph F. Smith",
  partOfCollections: ["prophets"],
  position: 6,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
} as const satisfies Author
