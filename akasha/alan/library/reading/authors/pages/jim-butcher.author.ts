import type { Author } from "../author.page-type.ts"

export const jimButcher = {
  id: "01a06807-f091-701b-aa03-5b9535b67921",
  pageTypeSlug: "author",
  slug: "jim-butcher",
  title: "Jim Butcher",
  partOfSlugs: ["fantasy-authors"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies Author
