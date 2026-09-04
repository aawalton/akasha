import type { Book } from "../../book.page-type.ts"

export const jeffersonAndHisTimeVolume6 = {
  id: "019db533-f39d-74a5-83cc-14c53309736c",
  pageTypeSlug: "book",
  slug: "jefferson-and-his-time-volume-6",
  title: "Jefferson & His Time Volume 6",
  kind: "read",
  status: "not-started",
  author: "Dumas Malone",
  unitSlug: "words",
  position: 6,
  ownLength: 129000,
} as const satisfies Book
