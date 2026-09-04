import type { Book } from "../../book.page-type.ts"

export const collectedDiscoursesVolume5 = {
  id: "019db533-f39d-7480-9cc9-51a334d8a7f3",
  pageTypeSlug: "book",
  slug: "collected-discourses-volume-5",
  title: "Collected Discourses Volume 5",
  status: "not-started",
  author: "Theodore Parker",
  unitSlug: "words",
  position: 5,
  ownLength: 117000,
} as const satisfies Book
