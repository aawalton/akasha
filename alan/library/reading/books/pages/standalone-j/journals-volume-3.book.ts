import type { Book } from "../../book.page-type.ts"

export const journalsVolume3 = {
  id: "019db533-f39d-7548-82dc-2bd73bb45f38",
  pageTypeSlug: "book",
  type: "book",
  slug: "journals-volume-3",
  title: "Journals Volume 3",
  status: "not-started",
  author: "Abraham John Valpy, Edmund Henry Barker",
  unit: "words",
  position: 3,
} as const satisfies Book
