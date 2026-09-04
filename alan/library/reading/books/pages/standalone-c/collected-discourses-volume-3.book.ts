import type { Book } from "../../book.page-type.ts"

export const collectedDiscoursesVolume3 = {
  id: "019db533-f39d-7567-90a9-b234a3c069d7",
  pageTypeSlug: "book",
  slug: "collected-discourses-volume-3",
  title: "Collected Discourses Volume 3",
  status: "not-started",
  author: "Theodore Parker",
  unitSlug: "words",
  position: 3,
  ownLength: 107000,
} as const satisfies Book
