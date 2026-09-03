import type { Book } from "../../book.page-type.ts"

export const jeffersonAndHisTimeVolume1 = {
  id: "019db533-f39d-7550-9183-e67cd2f071be",
  pageTypeSlug: "book",
  slug: "jefferson-and-his-time-volume-1",
  title: "Jefferson & His Time Volume 1",
  kind: "read",
  status: "not-started",
  author: "Dumas Malone",
  unitSlug: "words",
  position: 1,
  ownLength: 112750,
} as const satisfies Book
