import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const cultureTheHydrogenSonata = {
  id: "019db533-f39a-790e-92c4-d4c151311ad5",
  type: "page-type/book",
  slug: "culture-the-hydrogen-sonata",
  title: "Culture: The Hydrogen Sonata",
  status: "not-started",
  author: "Iain Banks",
  unit: "unit/words",
  position: 8,
  ownLength: 129500,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0081BU42O",
      externalLink: "https://www.amazon.com/dp/B0081BU42O",
      lastSyncedAt: "2025-10-11",
    },
  ],
} as const satisfies Book
