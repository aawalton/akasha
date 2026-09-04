import type { Author } from "../author.page-type.ts"

export const danBrown = {
  id: "01a06807-f091-7005-99a3-b9b3592c2280",
  pageTypeSlug: "author",
  slug: "dan-brown",
  title: "Dan Brown",
  partOfSlugs: ["thriller-authors"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies Author
