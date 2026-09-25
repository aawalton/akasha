import type { Author } from "akasha/alan/collection/reading/author/author.page-type.types.ts"

export const ezraTaftBenson = {
  id: "01a06807-f091-700e-befb-1cc3ee302c1d",
  type: "page-type/author",
  slug: "ezra-taft-benson",
  title: "Ezra Taft Benson",
  partOfCollections: ["author-collection/prophets"],
  position: 13,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
} as const satisfies Author
