import type { Book } from "../../book.page-type.ts"

export const aTouchOfPowerSiphon = {
  id: "019db533-f390-7652-a5a0-e30e45d7c2d6",
  pageTypeSlug: "book",
  slug: "a-touch-of-power-siphon",
  title: "A Touch of Power: Siphon",
  kind: "read",
  status: "completed",
  unitSlug: "words",
  position: 1,
  ownLength: 83500,
  ownProgress: 83500,
  publishedAt: "2025-06-25",
  partOfSlugs: ["book-series/a-touch-of-power"],
  source: "kindle",
  externalId: "B0FFPK5VCN",
  externalLink: "https://amazon.com/dp/B0FFPK5VCN",
} as const satisfies Book
