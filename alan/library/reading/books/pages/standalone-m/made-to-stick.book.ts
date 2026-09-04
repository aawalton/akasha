import type { Book } from "../../book.page-type.ts"

export const madeToStick = {
  id: "019db533-f39e-7077-a455-71c8177fff79",
  pageTypeSlug: "book",
  slug: "made-to-stick",
  title: "Made to Stick",
  status: "not-started",
  author: "Chip Heath, Dan Heath, ʻAlizah Raʻanan",
  unitSlug: "words",
  ownLength: 129300,
} as const satisfies Book
