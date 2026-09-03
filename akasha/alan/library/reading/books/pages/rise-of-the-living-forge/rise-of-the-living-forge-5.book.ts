import type { Book } from "../../book.page-type.ts"

export const riseOfTheLivingForge5 = {
  id: "019db533-f386-771f-8b50-d791102a7fe3",
  pageTypeSlug: "book",
  slug: "rise-of-the-living-forge-5",
  title: "Rise of the Living Forge 5",
  kind: "read",
  status: "not-started",
  unitSlug: "words",
  position: 5,
  ownLength: 5500,
  publishedAt: "2026-02-04",
  partOfSlugs: ["book-series/rise-of-the-living-forge"],
  source: "kindle",
  externalId: "B0FTZXKLB8",
  externalLink: "https://amazon.com/dp/B0FTZXKLB8",
} as const satisfies Book
