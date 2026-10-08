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
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
