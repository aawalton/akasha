import type { Author } from "akasha/alan/collection/reading/author/author.page-type.types.ts"

export const thomasSMonson = {
  id: "01a06807-f091-702c-a90f-e6bf9e4c8286",
  type: "page-type/author",
  slug: "thomas-s-monson",
  title: "Thomas S. Monson",
  partOfCollections: ["author-collection/prophets"],
  position: 16,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
} as const satisfies Author
