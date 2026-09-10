import type { Book } from "../book.page-type.types.ts"

export const dreamland = {
  id: "019db533-f39e-7122-8783-d2af085b0b51",
  pageTypeSlug: "book",
  type: "book",
  slug: "dreamland",
  title: "Dreamland",
  status: "completed",
  author: "Sarah Dessen",
  unit: "words",
  ownLength: 208800,
  ownProgress: 208800,
} as const satisfies Book
