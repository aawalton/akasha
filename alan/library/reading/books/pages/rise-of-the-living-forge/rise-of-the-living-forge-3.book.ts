import type { Book } from "../../book.page-type.ts"

export const riseOfTheLivingForge3 = {
  id: "019db533-f391-74d7-b3ae-8a79f7fc3652",
  pageTypeSlug: "book",
  slug: "rise-of-the-living-forge-3",
  title: "Rise of the Living Forge 3",
  kind: "read",
  status: "completed",
  unitSlug: "words",
  position: 3,
  ownLength: 181250,
  ownProgress: 181250,
  publishedAt: "2025-04-16",
  partOfSlugs: ["book-series/rise-of-the-living-forge"],
  source: "kindle",
  externalId: "B0DQ22ZB23",
  externalLink: "https://amazon.com/dp/B0DQ22ZB23",
} as const satisfies Book
