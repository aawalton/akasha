import type { Author } from "../author.page-type.ts"

export const jackCampbell = {
  id: "01a06807-f091-7017-9dc0-1d2e03b59b6a",
  pageTypeSlug: "author",
  slug: "jack-campbell",
  title: "Jack Campbell",
  partOfSlugs: ["science-fiction-authors"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies Author
