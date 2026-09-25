import type { Author } from "akasha/alan/collection/reading/author/author.page-type.types.ts"

export const spencerWKimball = {
  id: "01a06807-f091-702a-9638-a6a227f4d686",
  type: "page-type/author",
  slug: "spencer-w-kimball",
  title: "Spencer W. Kimball",
  partOfCollections: ["author-collection/prophets"],
  position: 12,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
} as const satisfies Author
