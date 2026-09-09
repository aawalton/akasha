import type { Book } from "../book.page-type.ts"

export const getUp = {
  id: "019db533-f39e-70fb-b83c-9b605f87073d",
  pageTypeSlug: "book",
  type: "book",
  slug: "get-up",
  title: "Get Up!",
  status: "not-started",
  author: "Dr. Seuss",
  unit: "words",
  ownLength: 137700,
} as const satisfies Book
