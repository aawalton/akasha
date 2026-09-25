import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theExpanseBabylonsAshes = {
  id: "019db533-f39b-7246-918b-22d792696315",
  type: "page-type/book",
  slug: "the-expanse-babylons-ashes",
  title: "The Expanse: Babylon's Ashes",
  status: "not-started",
  author: "James S. A. Corey",
  unit: "unit/words",
  position: 5,
  ownLength: 144750,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B018S2773Y",
      externalLink: "https://www.amazon.com/dp/B018S2773Y",
      lastSyncedAt: "2025-10-11",
    },
  ],
} as const satisfies Book
