import type { Book } from "../../book.page-type.ts"

export const sleepingMurder = {
  id: "019db533-f399-7b6a-b27f-c77260cea43f",
  pageTypeSlug: "book",
  slug: "sleeping-murder",
  title: "Sleeping Murder",
  status: "not-started",
  author: "Agatha Christie",
  unitSlug: "words",
  position: 13,
} as const satisfies Book
