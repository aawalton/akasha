import type { Book } from "../../book.page-type.ts"

export const josephSmithRoughStoneRolling = {
  id: "019db533-f39d-7a2a-8f91-85be8e1ded5f",
  pageTypeSlug: "book",
  slug: "joseph-smith-rough-stone-rolling",
  title: "Joseph Smith Rough Stone Rolling",
  kind: "read",
  status: "not-started",
  author: "Richard Lyman Bushman",
  unitSlug: "words",
  position: 14,
  ownLength: 140250,
} as const satisfies Book
