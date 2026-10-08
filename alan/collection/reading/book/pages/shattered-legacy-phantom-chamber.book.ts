import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const shatteredLegacyPhantomChamber = {
  id: "019db533-f38a-73dc-b1a7-058c1e3bd183",
  type: "page-type/book",
  slug: "shattered-legacy-phantom-chamber",
  title: "Shattered Legacy: Phantom Chamber",
  status: "not-started",
  unit: "unit/words",
  position: 2,
  ownLength: 130750,
  publishedAt: "2023-10-17",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0C2VYJRST",
      externalLink: "https://amazon.com/dp/B0C2VYJRST",
    },
  ],
  createdAt: "2026-04-22T12:39:34.026Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
