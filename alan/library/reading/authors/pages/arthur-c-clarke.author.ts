import type { Author } from "../author.page-type.types.ts"

export const arthurCClarke = {
  id: "01a06807-f090-7004-88a9-50ef2bf0b4de",
  pageTypeSlug: "author",
  type: "author",
  slug: "arthur-c-clarke",
  title: "Arthur C. Clarke",
  partOfCollections: ["science-fiction-authors"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
} as const satisfies Author
