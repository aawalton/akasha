import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theStormlightArchiveAPocketCompanion = {
  id: "019db533-f39c-7f83-a471-6e028551528b",
  type: "page-type/book",
  slug: "the-stormlight-archive-a-pocket-companion",
  title: "The Stormlight Archive: A Pocket Companion",
  status: "not-started",
  unit: "unit/words",
  position: 8,
  ownLength: 7000,
} as const satisfies Book
