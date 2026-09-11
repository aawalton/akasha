import type { Author } from "akasha/alan/library/reading/authors/author.page-type.types.ts"

export const davidWeber = {
  id: "01a06807-f091-700b-a176-38d4dd6278f1",
  type: "author",
  slug: "david-weber",
  title: "David Weber",
  partOfCollections: ["science-fiction-authors"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "paused",
} as const satisfies Author
