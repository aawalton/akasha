import type { Author } from "../author.page-type.ts"

export const danielSuarez = {
  id: "01a06807-f091-7007-8f00-f7de4bc45bb8",
  pageTypeSlug: "author",
  slug: "daniel-suarez",
  title: "Daniel Suarez",
  partOfSlugs: ["science-fiction-authors"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies Author
