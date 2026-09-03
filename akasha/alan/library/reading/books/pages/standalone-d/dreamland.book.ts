import type { Book } from "../../book.page-type.ts"

export const dreamland = {
  id: "019db533-f39e-7122-8783-d2af085b0b51",
  pageTypeSlug: "book",
  slug: "dreamland",
  title: "Dreamland",
  kind: "read",
  status: "completed",
  author: "Sarah Dessen",
  unitSlug: "words",
  ownLength: 208800,
  ownProgress: 208800,
} as const satisfies Book
