import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const expeditionaryForceGateway = {
  id: "019db533-f39b-70de-a43a-b709e528e325",
  type: "page-type/book",
  slug: "expeditionary-force-gateway",
  title: "Expeditionary Force: Gateway",
  status: "not-started",
  author: "Stefano Fusi",
  unit: "unit/words",
  position: 17,
  ownLength: 111000,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0F1TZDB9L",
      externalLink: "https://www.amazon.com/dp/B0F1TZDB9L",
      lastSyncedAt: "2025-10-11",
    },
  ],
} as const satisfies Book
