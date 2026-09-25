import type { Author } from "akasha/alan/collection/reading/author/author.page-type.types.ts"

export const josephFSmith = {
  id: "01a06807-f091-701e-a223-024373fed4ef",
  type: "page-type/author",
  slug: "joseph-f-smith",
  title: "Joseph F. Smith",
  partOfCollections: ["author-collection/prophets"],
  position: 6,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
} as const satisfies Author
