import type { Author } from "akasha/alan/collection/reading/author/author.page-type.types.ts"

export const arthurCClarke = {
  id: "01a06807-f090-7004-88a9-50ef2bf0b4de",
  type: "page-type/author",
  slug: "arthur-c-clarke",
  title: "Arthur C. Clarke",
  partOfCollections: ["author-collection/science-fiction-authors"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
} as const satisfies Author
