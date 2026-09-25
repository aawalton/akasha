import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const whole = {
  id: "019db533-f39d-7eef-bb81-d79b44681d2f",
  type: "page-type/book",
  slug: "whole",
  title: "Whole",
  status: "not-started",
  author: "Sandra Brown",
  unit: "unit/words",
  ownLength: 167250,
} as const satisfies Book
