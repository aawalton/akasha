import type { Book } from "../../book.page-type.ts"

export const nOrM = {
  id: "019db533-f399-7c20-bb8e-2f4e40061c9d",
  pageTypeSlug: "book",
  slug: "n-or-m",
  title: "N or M?",
  status: "not-started",
  author: "Agatha Christie",
  unitSlug: "words",
  position: 3,
} as const satisfies Book
