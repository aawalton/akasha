import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const furySeriesInFuryBorn = {
  id: "019db533-f39b-7108-baef-65ef3aff35fe",
  type: "page-type/book",
  slug: "fury-series-in-fury-born",
  title: "Fury Series: In Fury Born",
  status: "not-started",
  author: "Sherrilyn Kenyon",
  unit: "unit/words",
  ownLength: 253000,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B00APAHXVY",
      externalLink: "https://www.amazon.com/dp/B00APAHXVY",
      lastSyncedAt: "2025-10-11",
    },
  ],
} as const satisfies Book
