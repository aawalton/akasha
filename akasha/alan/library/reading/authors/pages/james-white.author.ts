import type { Author } from "../author.page-type.ts"

export const jamesWhite = {
  id: "01a06807-f091-7019-b748-4b625ff43a47",
  pageTypeSlug: "author",
  slug: "james-white",
  title: "James White",
  partOfSlugs: ["science-fiction-authors"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies Author
