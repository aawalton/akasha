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
} as const satisfies Author
