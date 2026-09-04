import type { Book } from "../../book.page-type.ts"

export const threeActTragedy = {
  id: "019db533-f399-7c2a-8633-93ad4508a7b9",
  pageTypeSlug: "book",
  slug: "three-act-tragedy",
  title: "Three Act Tragedy",
  kind: "read",
  status: "not-started",
  author: "Agatha Christie",
  unitSlug: "words",
  position: 10,
} as const satisfies Book
