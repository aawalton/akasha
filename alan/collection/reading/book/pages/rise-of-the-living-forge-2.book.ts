import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const riseOfTheLivingForge2 = {
  id: "019db533-f391-74cc-bba3-27a00ed526f3",
  type: "page-type/book",
  slug: "rise-of-the-living-forge-2",
  title: "Rise of the Living Forge 2",
  status: "completed",
  unit: "unit/words",
  position: 2,
  ownLength: 140000,
  ownProgress: 140000,
  publishedAt: "2025-01-15",
  partOfCollections: ["book-series/rise-of-the-living-forge"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0DFDSWVRL",
      externalLink: "https://amazon.com/dp/B0DFDSWVRL",
    },
  ],
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
