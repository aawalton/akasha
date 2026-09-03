import type { Book } from "../../book.page-type.ts"

export const getUp = {
  id: "019db533-f39e-70fb-b83c-9b605f87073d",
  pageTypeSlug: "book",
  slug: "get-up",
  title: "Get Up!",
  kind: "read",
  status: "not-started",
  author: "Dr. Seuss",
  unitSlug: "words",
  ownLength: 137700,
} as const satisfies Book
