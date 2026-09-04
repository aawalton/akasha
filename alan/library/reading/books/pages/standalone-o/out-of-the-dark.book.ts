import type { Book } from "../../book.page-type.ts"

export const outOfTheDark = {
  id: "019db533-f39a-7dbe-9288-c770b5a85e1d",
  pageTypeSlug: "book",
  slug: "out-of-the-dark",
  title: "Out of the Dark",
  status: "not-started",
  author: "David Weber",
  unitSlug: "words",
  ownLength: 132250,
  source: "kindle",
  externalId: "B003P8Q5LM",
  externalLink: "https://www.amazon.com/dp/B003P8Q5LM",
  lastSyncedAt: "2025-10-11",
} as const satisfies Book
