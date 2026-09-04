import type { Author } from "../author.page-type.ts"

export const isaacAsimov = {
  id: "01a06807-f091-7016-b880-c6b56f10357f",
  pageTypeSlug: "author",
  slug: "isaac-asimov",
  title: "Isaac Asimov",
  partOfSlugs: ["science-fiction-authors"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies Author
