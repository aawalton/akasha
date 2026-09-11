import type { Book } from "akasha/alan/library/reading/books/book.page-type.types.ts"

export const aTreasuryOfIrishFolklore = {
  id: "019db533-f39d-7cb8-a4b3-2489caf4b993",
  type: "book",
  slug: "a-treasury-of-irish-folklore",
  title: "A Treasury of Irish Folklore",
  status: "paused",
  unit: "words",
  position: 2,
  ownLength: 153250,
  ownProgress: 3500,
} as const satisfies Book
