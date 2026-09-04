import type { Author } from "../author.page-type.ts"

export const davidDrake = {
  id: "01a06807-f091-7008-8610-b42c748469ab",
  pageTypeSlug: "author",
  slug: "david-drake",
  title: "David Drake",
  partOfSlugs: ["science-fiction-authors"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies Author
