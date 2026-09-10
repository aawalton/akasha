import type { Author } from "../author.page-type.types.ts"

export const melanieCellier = {
  id: "01a06807-f091-7026-bb6d-58c52b07c138",
  pageTypeSlug: "author",
  type: "author",
  slug: "melanie-cellier",
  title: "Melanie Cellier",
  partOfCollections: ["fantasy-authors"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
} as const satisfies Author
