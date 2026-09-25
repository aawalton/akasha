import type { Author } from "akasha/alan/collection/reading/author/author.page-type.types.ts"

export const alanDeanFoster = {
  id: "01a06807-f090-7001-8bf6-fb065864ce4a",
  type: "page-type/author",
  slug: "alan-dean-foster",
  title: "Alan Dean Foster",
  partOfCollections: ["author-collection/science-fiction-authors"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
} as const satisfies Author
