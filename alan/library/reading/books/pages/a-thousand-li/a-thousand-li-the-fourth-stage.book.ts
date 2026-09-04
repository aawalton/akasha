import type { Book } from "../../book.page-type.ts"

export const aThousandLiTheFourthStage = {
  id: "019db533-f390-75bf-a9eb-b537186f10e2",
  pageTypeSlug: "book",
  slug: "a-thousand-li-the-fourth-stage",
  title: "A Thousand Li: the Fourth Stage",
  kind: "read",
  status: "completed",
  author: "Tao Wong",
  unitSlug: "words",
  position: 10,
  ownLength: 109750,
  ownProgress: 109750,
  publishedAt: "2024-03-01",
  partOfSlugs: ["book-series/a-thousand-li"],
  source: "kindle",
  externalId: "B0CDBBCJSJ",
  externalLink: "https://amazon.com/dp/B0CDBBCJSJ",
} as const satisfies Book
