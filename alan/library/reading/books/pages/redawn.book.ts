import type { Book } from "../book.page-type.types.ts"

export const redawn = {
  id: "019db533-f39c-7fc9-89d8-10cfdc0bd50b",
  pageTypeSlug: "book",
  type: "book",
  slug: "redawn",
  title: "ReDawn",
  status: "completed",
  rank: "B",
  author: "Brandon Sanderson, Janci Patterson",
  unit: "words",
  position: 2,
  ownLength: 104250,
  ownProgress: 104250,
} as const satisfies Book
