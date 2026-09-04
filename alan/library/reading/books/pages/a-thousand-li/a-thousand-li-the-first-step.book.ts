import type { Book } from "../../book.page-type.ts"

export const aThousandLiTheFirstStep = {
  id: "019db533-f390-7601-a186-3754f887a912",
  pageTypeSlug: "book",
  slug: "a-thousand-li-the-first-step",
  title: "A Thousand Li: the First Step",
  kind: "read",
  status: "completed",
  author: "Tao Wong",
  unitSlug: "words",
  position: 1,
  ownLength: 76750,
  ownProgress: 76750,
  publishedAt: "2019-04-02",
  partOfSlugs: ["book-series/a-thousand-li"],
  source: "kindle",
  externalId: "B07PKGSDDQ",
  externalLink: "https://amazon.com/dp/B07PKGSDDQ",
} as const satisfies Book
