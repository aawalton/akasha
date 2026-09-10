import type { Author } from "../author.page-type.types.ts"

export const jimButcher = {
  id: "01a06807-f091-701b-aa03-5b9535b67921",
  pageTypeSlug: "author",
  type: "author",
  slug: "jim-butcher",
  title: "Jim Butcher",
  partOfCollections: ["fantasy-authors"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
} as const satisfies Author
