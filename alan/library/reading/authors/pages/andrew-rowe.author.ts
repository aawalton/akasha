import type { Author } from "../author.page-type.ts"

export const andrewRowe = {
  id: "01a06807-f090-7002-9948-3011bcd9b03d",
  pageTypeSlug: "author",
  slug: "andrew-rowe",
  title: "Andrew Rowe",
  partOfSlugs: ["fantasy-authors"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies Author
