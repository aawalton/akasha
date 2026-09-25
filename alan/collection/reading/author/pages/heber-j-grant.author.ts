import type { Author } from "akasha/alan/collection/reading/author/author.page-type.types.ts"

export const heberJGrant = {
  id: "01a06807-f091-7013-ab61-188204f6910c",
  type: "page-type/author",
  slug: "heber-j-grant",
  title: "Heber J. Grant",
  partOfCollections: ["author-collection/prophets"],
  position: 7,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
} as const satisfies Author
