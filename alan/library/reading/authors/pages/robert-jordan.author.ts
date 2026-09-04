import type { Author } from "../author.page-type.ts"

export const robertJordan = {
  id: "01a06807-f091-7028-a510-dda867ed7ad3",
  pageTypeSlug: "author",
  slug: "robert-jordan",
  title: "Robert Jordan",
  partOfSlugs: ["fantasy-authors"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "paused",
} as const satisfies Author
