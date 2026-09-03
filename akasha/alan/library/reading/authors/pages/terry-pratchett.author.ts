import type { Author } from "../author.page-type.ts"

export const terryPratchett = {
  id: "01a06807-f091-702b-8b9a-1fd5b59e72b1",
  pageTypeSlug: "author",
  slug: "terry-pratchett",
  title: "Terry Pratchett",
  partOfSlugs: ["fantasy-authors"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies Author
