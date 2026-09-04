import type { Book } from "../../book.page-type.ts"

export const fiveLittlePigs = {
  id: "019db533-f399-7be0-a37f-b9095b145935",
  pageTypeSlug: "book",
  slug: "five-little-pigs",
  title: "Five Little Pigs",
  status: "not-started",
  author: "Agatha Christie",
  unitSlug: "words",
  position: 21,
} as const satisfies Book
