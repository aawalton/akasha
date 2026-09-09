import type { Book } from "../../book.page-type.ts"

export const riseOfTheLivingForge4 = {
  id: "019db533-f386-772b-aad0-143fecd5ffb9",
  pageTypeSlug: "book",
  type: "book",
  slug: "rise-of-the-living-forge-4",
  title: "Rise of the Living Forge 4",
  status: "not-started",
  unit: "words",
  position: 4,
  ownLength: 162000,
  publishedAt: "2025-10-15",
  partOfCollections: ["book-series/rise-of-the-living-forge"],
  source: "kindle",
  externalId: "B0F44FMLQS",
  externalLink: "https://amazon.com/dp/B0F44FMLQS",
} as const satisfies Book
