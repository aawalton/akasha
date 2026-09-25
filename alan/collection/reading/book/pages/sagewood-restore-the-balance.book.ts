import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const sagewoodRestoreTheBalance = {
  id: "019db533-f391-7573-9656-54dc412b8fb3",
  type: "page-type/book",
  slug: "sagewood-restore-the-balance",
  title: "Sagewood: Restore the Balance",
  status: "not-started",
  unit: "unit/words",
  position: 4,
  ownLength: 83000,
  publishedAt: "2025-04-23",
  partOfCollections: ["book-series/sagewood"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0F1NH8N3G",
      externalLink: "https://amazon.com/dp/B0F1NH8N3G",
    },
  ],
} as const satisfies Book
