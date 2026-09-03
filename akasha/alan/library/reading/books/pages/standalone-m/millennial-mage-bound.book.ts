import type { Book } from "../../book.page-type.ts"

export const millennialMageBound = {
  id: "019db533-f391-730b-b5f1-aa4da066368f",
  pageTypeSlug: "book",
  slug: "millennial-mage-bound",
  title: "Millennial Mage: Bound",
  kind: "read",
  status: "completed",
  unitSlug: "words",
  position: 4,
  ownLength: 105250,
  ownProgress: 105250,
  publishedAt: "2023-06-28",
  source: "kindle",
  externalId: "B0C6489HRC",
  externalLink: "https://amazon.com/dp/B0C6489HRC",
} as const satisfies Book
