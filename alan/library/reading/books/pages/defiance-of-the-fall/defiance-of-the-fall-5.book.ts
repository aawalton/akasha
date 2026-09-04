import type { Book } from "../../book.page-type.ts"

export const defianceOfTheFall5 = {
  id: "019db533-f390-7cff-be3b-3edc70fa62ac",
  pageTypeSlug: "book",
  slug: "defiance-of-the-fall-5",
  title: "Defiance of the Fall 5",
  status: "completed",
  author: "J. F. Brink",
  unitSlug: "words",
  position: 5,
  ownLength: 165000,
  ownProgress: 165000,
  publishedAt: "2022-05-20",
  partOfSlugs: ["book-series/defiance-of-the-fall"],
  source: "kindle",
  externalId: "B09SBBKMLM",
  externalLink: "https://amazon.com/dp/B09SBBKMLM",
} as const satisfies Book
