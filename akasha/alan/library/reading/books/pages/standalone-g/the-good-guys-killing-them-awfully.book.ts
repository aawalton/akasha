import type { Book } from "../../book.page-type.ts"

export const theGoodGuysKillingThemAwfully = {
  id: "019db533-f391-791d-b0ad-66b67bbbe13e",
  pageTypeSlug: "book",
  slug: "the-good-guys-killing-them-awfully",
  title: "The Good Guys: Killing Them Awfully",
  kind: "read",
  status: "not-started",
  unitSlug: "words",
  position: 11,
  ownLength: 84250,
  publishedAt: "2021-04-29",
  source: "kindle",
  externalId: "B08WLC89CY",
  externalLink: "https://amazon.com/dp/B08WLC89CY",
} as const satisfies Book
