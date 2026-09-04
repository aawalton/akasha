import type { Book } from "../../book.page-type.ts"

export const lux = {
  id: "019db533-f39d-7083-ba28-d40487c67720",
  pageTypeSlug: "book",
  slug: "lux",
  title: "Lux",
  kind: "read",
  status: "not-started",
  author: "Jennifer L. Armentrout",
  unitSlug: "words",
  position: 5,
} as const satisfies Book
