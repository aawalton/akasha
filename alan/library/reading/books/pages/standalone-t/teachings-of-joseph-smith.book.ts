import type { Book } from "../../book.page-type.ts"

export const teachingsOfJosephSmith = {
  id: "019db533-f39d-7933-8f26-0b20a6d2dea2",
  pageTypeSlug: "book",
  slug: "teachings-of-joseph-smith",
  title: "Teachings of Joseph Smith",
  status: "completed",
  rank: "B",
  author: "Joseph Smith, Jr.",
  unitSlug: "words",
  position: 1,
  ownLength: 182500,
  ownProgress: 182500,
} as const satisfies Book
