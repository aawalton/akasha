import type { Author } from "../author.page-type.ts"

export const louisLAmour = {
  id: "01a06807-f091-7025-baf3-08c7533348fa",
  pageTypeSlug: "author",
  slug: "louis-l-amour",
  title: "Louis L’Amour",
  partOfCollections: ["westerns-authors"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
} as const satisfies Author
