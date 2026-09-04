import type { Book } from "../../book.page-type.ts"

export const sectorGeneralMajorOperation = {
  id: "019db533-f38b-73c5-bb19-e7e556fa4308",
  pageTypeSlug: "book",
  slug: "sector-general-major-operation",
  title: "Sector General: Major Operation",
  status: "not-started",
  author: "James White",
  unitSlug: "words",
  position: 3,
  ownLength: 10000,
  publishedAt: "1981-04-12",
  source: "kindle",
  externalId: "0345293819",
  externalLink: "https://amazon.com/dp/0345293819",
} as const satisfies Book
