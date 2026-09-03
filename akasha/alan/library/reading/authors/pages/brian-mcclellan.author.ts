import type { Author } from "../author.page-type.ts"

export const brianMcclellan = {
  id: "01a06807-f091-7000-a43b-04721576b908",
  pageTypeSlug: "author",
  slug: "brian-mcclellan",
  title: "Brian McClellan",
  partOfSlugs: ["fantasy-authors"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies Author
