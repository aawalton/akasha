import type { Book } from "../../book.page-type.ts"

export const jeffersonAndHisTimeVolume2 = {
  id: "019db533-f39d-748f-a3e1-777f6603bad4",
  pageTypeSlug: "book",
  slug: "jefferson-and-his-time-volume-2",
  title: "Jefferson & His Time Volume 2",
  kind: "read",
  status: "not-started",
  author: "Dumas Malone",
  unitSlug: "words",
  position: 2,
  ownLength: 122000,
} as const satisfies Book
