import type { Book } from "../../book.page-type.ts"

export const jeffersonAndHisTimeVolume3 = {
  id: "019db533-f39d-744b-8003-a8fc32e1dbe0",
  pageTypeSlug: "book",
  slug: "jefferson-and-his-time-volume-3",
  title: "Jefferson & His Time Volume 3",
  status: "not-started",
  author: "Dumas Malone",
  unitSlug: "words",
  position: 3,
  ownLength: 132500,
} as const satisfies Book
