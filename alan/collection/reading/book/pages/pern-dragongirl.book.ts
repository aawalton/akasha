import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const pernDragongirl = {
  id: "019db533-f39b-7265-b267-8adab2b3c8ec",
  type: "page-type/book",
  slug: "pern-dragongirl",
  title: "Pern: Dragongirl",
  status: "not-started",
  author: "Todd McCaffrey, Anne McCaffrey",
  unit: "unit/words",
  position: 9,
  ownLength: 128250,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0036S4CAC",
      externalLink: "https://www.amazon.com/dp/B0036S4CAC",
      lastSyncedAt: "2025-10-11",
    },
  ],
} as const satisfies Book
