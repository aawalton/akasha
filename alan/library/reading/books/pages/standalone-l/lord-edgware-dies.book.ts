import type { Book } from "../../book.page-type.ts"

export const lordEdgwareDies = {
  id: "019db533-f399-7d4b-b5cd-9523682f9983",
  pageTypeSlug: "book",
  slug: "lord-edgware-dies",
  title: "Lord Edgware Dies",
  status: "not-started",
  author: "Agatha Christie",
  unitSlug: "words",
  position: 8,
} as const satisfies Book
