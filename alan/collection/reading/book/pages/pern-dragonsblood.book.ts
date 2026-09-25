import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const pernDragonsblood = {
  id: "019db533-f39b-7228-a35b-a84aa2a492af",
  type: "page-type/book",
  slug: "pern-dragonsblood",
  title: "Pern: Dragonsblood",
  status: "not-started",
  author: "Todd McCaffrey",
  unit: "unit/words",
  position: 7,
  ownLength: 120000,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B000FC2RO0",
      externalLink: "https://www.amazon.com/dp/B000FC2RO0",
      lastSyncedAt: "2025-10-11",
    },
  ],
} as const satisfies Book
