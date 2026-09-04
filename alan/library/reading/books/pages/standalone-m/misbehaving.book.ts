import type { Book } from "../../book.page-type.ts"

export const misbehaving = {
  id: "019db533-f39e-70d5-9393-c202a6e8533e",
  pageTypeSlug: "book",
  slug: "misbehaving",
  title: "Misbehaving",
  status: "not-started",
  author: "Richard H. Thaler",
  unitSlug: "words",
  ownLength: 203700,
} as const satisfies Book
