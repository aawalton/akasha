import type { Author } from "akasha/alan/collection/reading/author/author.page-type.types.ts"

export const larryCorreia = {
  id: "01a06807-f091-7022-8465-f95186084322",
  type: "page-type/author",
  slug: "larry-correia",
  title: "Larry Correia",
  partOfCollections: ["author-collection/fantasy-authors"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  createdAt: "2026-09-03T16:09:05.937Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Author
