import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const tenLessonsToTransformYourMarriage = {
  id: "019db533-f39e-70bd-9895-e27bdf3e37fd",
  type: "page-type/book",
  slug: "ten-lessons-to-transform-your-marriage",
  title: "Ten Lessons to Transform Your Marriage",
  status: "not-started",
  author: "John Mordechai Gottman, Julie Schwartz Gottman, Joan Declaire",
  unit: "unit/words",
  ownLength: 74550,
} as const satisfies Book
