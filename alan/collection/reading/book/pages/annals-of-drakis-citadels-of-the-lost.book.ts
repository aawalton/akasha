import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const annalsOfDrakisCitadelsOfTheLost = {
  id: "019db533-f39b-71ea-8038-e039bc5931a0",
  type: "page-type/book",
  slug: "annals-of-drakis-citadels-of-the-lost",
  title: "Annals of Drakis: Citadels of the Lost",
  status: "not-started",
  unit: "unit/words",
  position: 1,
  ownLength: 91250,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0057Z1V10",
      externalLink: "https://www.amazon.com/dp/B0057Z1V10",
      lastSyncedAt: "2025-10-11",
    },
  ],
} as const satisfies Book
