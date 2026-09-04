import type { Book } from "../../book.page-type.ts"

export const aThousandLiTheThirdKingdom = {
  id: "019db533-f390-75b0-a8c6-3e59afdf89c3",
  pageTypeSlug: "book",
  slug: "a-thousand-li-the-third-kingdom",
  title: "A Thousand Li: The Third Kingdom",
  status: "completed",
  author: "Bible",
  unitSlug: "words",
  position: 7,
  ownLength: 98250,
  ownProgress: 98250,
  publishedAt: "2022-07-01",
  partOfSlugs: ["book-series/a-thousand-li"],
  source: "kindle",
  externalId: "B0B2KMFK8D",
  externalLink: "https://amazon.com/dp/B0B2KMFK8D",
} as const satisfies Book
