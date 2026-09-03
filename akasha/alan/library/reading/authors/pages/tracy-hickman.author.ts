import type { Author } from "../author.page-type.ts"

export const tracyHickman = {
  id: "01a06807-f091-702d-8e28-eaedc449e259",
  pageTypeSlug: "author",
  slug: "tracy-hickman",
  title: "Tracy Hickman",
  partOfSlugs: ["fantasy-authors"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies Author
