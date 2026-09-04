import type { Book } from "../../book.page-type.ts"

export const riseOfTheLivingForgeBook1 = {
  id: "019db533-f391-74fe-8b7c-1877ad948a75",
  pageTypeSlug: "book",
  slug: "rise-of-the-living-forge-book-1",
  title: "Rise of the Living Forge",
  kind: "read",
  status: "completed",
  author: "Rudi Volti",
  unitSlug: "words",
  position: 1,
  ownLength: 194250,
  ownProgress: 194250,
  publishedAt: "2024-10-08",
  partOfSlugs: ["book-series/rise-of-the-living-forge"],
  source: "kindle",
  externalId: "B0D8XVRYDJ",
  externalLink: "https://amazon.com/dp/B0D8XVRYDJ",
} as const satisfies Book
