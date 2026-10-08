import type { Author } from "akasha/alan/collection/reading/author/author.page-type.types.ts"

export const louisLAmour = {
  id: "01a06807-f091-7025-baf3-08c7533348fa",
  type: "page-type/author",
  slug: "louis-l-amour",
  title: "Louis L’Amour",
  partOfCollections: ["author-collection/westerns-authors"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  createdAt: "2026-09-03T16:09:05.937Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Author
