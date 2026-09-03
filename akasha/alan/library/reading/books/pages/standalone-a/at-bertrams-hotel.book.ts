import type { Book } from "../../book.page-type.ts"

export const atBertramsHotel = {
  id: "019db533-f399-7b75-b1c2-c83d5fa490ba",
  pageTypeSlug: "book",
  slug: "at-bertrams-hotel",
  title: "At Bertram's Hotel",
  kind: "read",
  status: "not-started",
  author: "Agatha Christie",
  unitSlug: "words",
  position: 11,
} as const satisfies Book
