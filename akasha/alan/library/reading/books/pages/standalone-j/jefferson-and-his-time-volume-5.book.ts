import type { Book } from "../../book.page-type.ts"

export const jeffersonAndHisTimeVolume5 = {
  id: "019db533-f39d-7519-b2ae-ffa7f78b1164",
  pageTypeSlug: "book",
  slug: "jefferson-and-his-time-volume-5",
  title: "Jefferson & His Time Volume 5",
  kind: "read",
  status: "not-started",
  author: "Dumas Malone",
  unitSlug: "words",
  position: 5,
  ownLength: 167000,
} as const satisfies Book
