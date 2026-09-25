import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const riseOfTheLivingForgeBook1 = {
  id: "019db533-f391-74fe-8b7c-1877ad948a75",
  type: "page-type/book",
  slug: "rise-of-the-living-forge-book-1",
  title: "Rise of the Living Forge",
  status: "completed",
  author: "Rudi Volti",
  unit: "unit/words",
  position: 1,
  ownLength: 194250,
  ownProgress: 194250,
  publishedAt: "2024-10-08",
  partOfCollections: ["book-series/rise-of-the-living-forge"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0D8XVRYDJ",
      externalLink: "https://amazon.com/dp/B0D8XVRYDJ",
    },
  ],
} as const satisfies Book
