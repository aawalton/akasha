import type { Book } from "../book.page-type.ts"

export const realityIsBroken = {
  id: "019db533-f39e-70e5-ad2f-a17969179b96",
  pageTypeSlug: "book",
  type: "book",
  slug: "reality-is-broken",
  title: "Reality Is Broken",
  status: "not-started",
  author: "Jane McGonigal",
  unit: "words",
  ownLength: 200700,
} as const satisfies Book
