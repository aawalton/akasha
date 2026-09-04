import type { Book } from "../../book.page-type.ts"

export const riseOfTheLivingForge2 = {
  id: "019db533-f391-74cc-bba3-27a00ed526f3",
  pageTypeSlug: "book",
  slug: "rise-of-the-living-forge-2",
  title: "Rise of the Living Forge 2",
  status: "completed",
  unitSlug: "words",
  position: 2,
  ownLength: 140000,
  ownProgress: 140000,
  publishedAt: "2025-01-15",
  partOfSlugs: ["book-series/rise-of-the-living-forge"],
  source: "kindle",
  externalId: "B0DFDSWVRL",
  externalLink: "https://amazon.com/dp/B0DFDSWVRL",
} as const satisfies Book
