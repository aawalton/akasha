import type { Author } from "../author.page-type.ts"

export const danSimmons = {
  id: "01a06807-f091-7006-8c56-73887f171e9d",
  pageTypeSlug: "author",
  slug: "dan-simmons",
  title: "Dan Simmons",
  partOfSlugs: ["science-fiction-authors"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies Author
