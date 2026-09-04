import type { Book } from "../../book.page-type.ts"

export const teachingsOfBrighamYoung = {
  id: "019db533-f39d-7a0b-80fd-af7e7ee58762",
  pageTypeSlug: "book",
  slug: "teachings-of-brigham-young",
  title: "Teachings of Brigham Young",
  status: "not-started",
  author: "Brigham Young",
  unitSlug: "words",
  position: 2,
  ownLength: 121250,
} as const satisfies Book
