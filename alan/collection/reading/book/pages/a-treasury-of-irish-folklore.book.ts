import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const aTreasuryOfIrishFolklore = {
  id: "019db533-f39d-7cb8-a4b3-2489caf4b993",
  type: "page-type/book",
  slug: "a-treasury-of-irish-folklore",
  title: "A Treasury of Irish Folklore",
  status: "paused",
  unit: "unit/words",
  position: 2,
  ownLength: 153250,
  ownProgress: 3500,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
