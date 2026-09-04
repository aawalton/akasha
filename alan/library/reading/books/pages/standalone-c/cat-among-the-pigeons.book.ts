import type { Book } from "../../book.page-type.ts"

export const catAmongThePigeons = {
  id: "019db533-f399-7d15-8cc2-5a7aca8f8d78",
  pageTypeSlug: "book",
  slug: "cat-among-the-pigeons",
  title: "Cat Among the Pigeons",
  kind: "read",
  status: "not-started",
  author: "Agatha Christie",
  unitSlug: "words",
  position: 28,
} as const satisfies Book
