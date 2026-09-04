import type { Book } from "../../book.page-type.ts"

export const aTreasuryOfIrishFolklore = {
  id: "019db533-f39d-7cb8-a4b3-2489caf4b993",
  pageTypeSlug: "book",
  slug: "a-treasury-of-irish-folklore",
  title: "A Treasury of Irish Folklore",
  status: "paused",
  unitSlug: "words",
  position: 2,
  ownLength: 153250,
  ownProgress: 3500,
} as const satisfies Book
