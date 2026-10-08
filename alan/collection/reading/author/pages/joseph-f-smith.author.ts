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
  createdAt: "2026-09-03T16:09:05.937Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Author
