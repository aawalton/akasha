import type { Author } from "../author.page-type.ts"

export const craigAlanson = {
  id: "01a06807-f091-7004-a028-ed42e764cc22",
  pageTypeSlug: "author",
  slug: "craig-alanson",
  title: "Craig Alanson",
  partOfSlugs: ["science-fiction-authors"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies Author
