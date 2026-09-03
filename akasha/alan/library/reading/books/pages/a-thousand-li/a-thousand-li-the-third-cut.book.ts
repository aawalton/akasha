import type { Book } from "../../book.page-type.ts"

export const aThousandLiTheThirdCut = {
  id: "019db533-f390-75e8-bd34-7c0c86592394",
  pageTypeSlug: "book",
  slug: "a-thousand-li-the-third-cut",
  title: "A Thousand Li: The Third Cut",
  kind: "read",
  status: "completed",
  author: "Tao Wong",
  unitSlug: "words",
  position: 9,
  ownLength: 115250,
  ownProgress: 115250,
  publishedAt: "2023-08-01",
  partOfSlugs: ["book-series/a-thousand-li"],
  source: "kindle",
  externalId: "B0BT38XST3",
  externalLink: "https://amazon.com/dp/B0BT38XST3",
} as const satisfies Book
