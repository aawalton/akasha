import type { Book } from "../book.page-type.ts"

export const margaretHerFirst75Years = {
  id: "019db533-f39d-7a79-8347-5285fee3bc79",
  pageTypeSlug: "book",
  type: "book",
  slug: "margaret-her-first-75-years",
  title: "Margaret: Her First 75 Years",
  status: "not-started",
  author: "William Shakespeare",
  unit: "words",
  position: 12,
  ownLength: 63500,
} as const satisfies Book
