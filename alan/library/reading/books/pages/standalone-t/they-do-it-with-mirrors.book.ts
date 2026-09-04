import type { Book } from "../../book.page-type.ts"

export const theyDoItWithMirrors = {
  id: "019db533-f399-7baa-b8de-d8c412c5c544",
  pageTypeSlug: "book",
  slug: "they-do-it-with-mirrors",
  title: "They Do It with Mirrors",
  kind: "read",
  status: "not-started",
  author: "Agatha Christie",
  unitSlug: "words",
  position: 6,
} as const satisfies Book
