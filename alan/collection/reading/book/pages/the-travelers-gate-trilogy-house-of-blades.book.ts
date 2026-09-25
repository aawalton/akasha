import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theTravelersGateTrilogyHouseOfBlades = {
  id: "019db533-f39b-7078-982f-156e44997c3c",
  type: "page-type/book",
  slug: "the-travelers-gate-trilogy-house-of-blades",
  title: "The Traveler's Gate Trilogy: House of Blades",
  status: "not-started",
  unit: "unit/words",
  ownLength: 101500,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B00D52X58Y",
      externalLink: "https://www.amazon.com/dp/B00D52X58Y",
      lastSyncedAt: "2025-10-11",
    },
  ],
} as const satisfies Book
