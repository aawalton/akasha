import type { Author } from "../author.page-type.types.ts"

export const cSLewis = {
  id: "01a06807-f091-7002-bfdd-29359cc03b97",
  pageTypeSlug: "author",
  type: "author",
  slug: "c-s-lewis",
  title: "C. S. Lewis",
  partOfCollections: ["faith-authors"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
} as const satisfies Author
