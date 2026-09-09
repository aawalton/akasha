import type { Author } from "../author.page-type.ts"

export const tracyHickman = {
  id: "01a06807-f091-702d-8e28-eaedc449e259",
  pageTypeSlug: "author",
  type: "author",
  slug: "tracy-hickman",
  title: "Tracy Hickman",
  partOfCollections: ["fantasy-authors"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
} as const satisfies Author
