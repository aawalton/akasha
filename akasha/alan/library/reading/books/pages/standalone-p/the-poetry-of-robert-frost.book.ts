import type { Book } from "../../book.page-type.ts"

export const thePoetryOfRobertFrost = {
  id: "019db533-f39d-759e-a12b-936d126a1844",
  pageTypeSlug: "book",
  slug: "the-poetry-of-robert-frost",
  title: "The Poetry of Robert Frost",
  kind: "read",
  status: "paused",
  author: "Robert Frost",
  unitSlug: "words",
  position: 2,
  ownLength: 132000,
  ownProgress: 59500,
} as const satisfies Book
