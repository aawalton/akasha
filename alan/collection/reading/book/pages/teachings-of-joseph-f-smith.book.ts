import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const teachingsOfJosephFSmith = {
  id: "019db533-f39d-79f3-9ee3-6a8d656f36e0",
  type: "page-type/book",
  slug: "teachings-of-joseph-f-smith",
  title: "Teachings of Joseph F. Smith",
  status: "not-started",
  author: "Edwin F. Parry",
  unit: "unit/words",
  position: 7,
  ownLength: 135750,
} as const satisfies Book
