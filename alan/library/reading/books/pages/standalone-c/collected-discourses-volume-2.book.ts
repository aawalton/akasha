import type { Book } from "../../book.page-type.ts"

export const collectedDiscoursesVolume2 = {
  id: "019db533-f39d-75ad-b319-ea1486534e73",
  pageTypeSlug: "book",
  slug: "collected-discourses-volume-2",
  title: "Collected Discourses Volume 2",
  status: "not-started",
  author: "Arthur Conan Doyle",
  unitSlug: "words",
  position: 2,
  ownLength: 96500,
} as const satisfies Book
