import type { Book } from "../../book.page-type.ts"

export const collectedDiscoursesVolume1 = {
  id: "019db533-f39d-756f-8980-aa6eb905f810",
  pageTypeSlug: "book",
  slug: "collected-discourses-volume-1",
  title: "Collected Discourses Volume 1",
  kind: "read",
  status: "not-started",
  author: "Theodore Parker",
  unitSlug: "words",
  position: 1,
  ownLength: 99250,
} as const satisfies Book
