import type { Book } from "../../book.page-type.ts"

export const teachingsOfGeorgeAlbertSmith = {
  id: "019db533-f39d-7961-bc39-7d31984b1c3e",
  pageTypeSlug: "book",
  slug: "teachings-of-george-albert-smith",
  title: "Teachings of George Albert Smith",
  status: "not-started",
  author: "Smith, George Albert",
  unitSlug: "words",
  position: 9,
  ownLength: 49000,
} as const satisfies Book
