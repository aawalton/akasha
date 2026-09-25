import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theFiveElementsOfEffectiveThinking = {
  id: "019db533-f39d-7f1d-932c-f74857a766ae",
  type: "page-type/book",
  slug: "the-five-elements-of-effective-thinking",
  title: "The Five Elements of Effective Thinking",
  status: "completed",
  grade: "A",
  author: "Edward B. Burger, Michael Starbird, Brian Troxell",
  unit: "unit/words",
  ownLength: 47250,
  ownProgress: 47250,
} as const satisfies Book
