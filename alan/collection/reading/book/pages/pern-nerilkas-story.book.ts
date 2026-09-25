import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const pernNerilkasStory = {
  id: "019db533-f39a-7d7e-99bd-0aef4989d8cf",
  type: "page-type/book",
  slug: "pern-nerilkas-story",
  title: "Pern: Nerilka's Story",
  status: "not-started",
  author: "Anne McCaffrey",
  unit: "unit/words",
  position: 13,
  ownLength: 52000,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B000FBFODC",
      externalLink: "https://www.amazon.com/dp/B000FBFODC",
      lastSyncedAt: "2025-10-11",
    },
  ],
} as const satisfies Book
