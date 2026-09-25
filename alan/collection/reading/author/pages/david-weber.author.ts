import type { Author } from "akasha/alan/collection/reading/author/author.page-type.types.ts"

export const davidWeber = {
  id: "01a06807-f091-700b-a176-38d4dd6278f1",
  type: "page-type/author",
  slug: "david-weber",
  title: "David Weber",
  partOfCollections: ["author-collection/science-fiction-authors"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "paused",
} as const satisfies Author
