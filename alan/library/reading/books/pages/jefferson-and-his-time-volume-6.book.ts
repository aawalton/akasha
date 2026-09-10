import type { Book } from "../book.page-type.types.ts"

export const jeffersonAndHisTimeVolume6 = {
  id: "019db533-f39d-74a5-83cc-14c53309736c",
  pageTypeSlug: "book",
  type: "book",
  slug: "jefferson-and-his-time-volume-6",
  title: "Jefferson & His Time Volume 6",
  status: "not-started",
  author: "Dumas Malone",
  unit: "words",
  position: 6,
  ownLength: 129000,
} as const satisfies Book
