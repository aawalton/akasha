import type { Book } from "../../book.page-type.ts"

export const sectorGeneral5 = {
  id: "019db533-f38b-73bc-bfcf-ed5f03f73c4b",
  pageTypeSlug: "book",
  slug: "sector-general-5",
  title: "Sector General 5",
  status: "not-started",
  author: "James White",
  unitSlug: "words",
  position: 5,
  ownLength: 49000,
  publishedAt: "1987-06-12",
  source: "kindle",
  externalId: "0345346270",
  externalLink: "https://amazon.com/dp/0345346270",
} as const satisfies Book
