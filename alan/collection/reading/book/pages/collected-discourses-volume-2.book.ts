import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const collectedDiscoursesVolume2 = {
  id: "019db533-f39d-75ad-b319-ea1486534e73",
  type: "page-type/book",
  slug: "collected-discourses-volume-2",
  title: "Collected Discourses Volume 2",
  status: "not-started",
  author: "Arthur Conan Doyle",
  unit: "unit/words",
  position: 2,
  ownLength: 96500,
} as const satisfies Book
