import type { Book } from "../../book.page-type.ts"

export const historiesVolume1 = {
  id: "019db533-f39d-7419-af72-48e6576f00fa",
  pageTypeSlug: "book",
  slug: "histories-volume-1",
  title: "Histories Volume 1",
  status: "not-started",
  author: "Yuval Noah Harari",
  unitSlug: "words",
  position: 1,
} as const satisfies Book
