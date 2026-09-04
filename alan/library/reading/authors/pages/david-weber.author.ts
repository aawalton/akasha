import type { Author } from "../author.page-type.ts"

export const davidWeber = {
  id: "01a06807-f091-700b-a176-38d4dd6278f1",
  pageTypeSlug: "author",
  slug: "david-weber",
  title: "David Weber",
  partOfSlugs: ["science-fiction-authors"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "paused",
} as const satisfies Author
