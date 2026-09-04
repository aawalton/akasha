import type { Book } from "../../book.page-type.ts"

export const collectedDiscoursesVolume4 = {
  id: "019db533-f39d-7402-aa9f-818d32b2d9d5",
  pageTypeSlug: "book",
  slug: "collected-discourses-volume-4",
  title: "Collected Discourses Volume 4",
  kind: "read",
  status: "not-started",
  author: "Arthur Conan Doyle",
  unitSlug: "words",
  position: 4,
  ownLength: 108750,
} as const satisfies Book
