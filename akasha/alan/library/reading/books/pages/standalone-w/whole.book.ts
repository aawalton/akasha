import type { Book } from "../../book.page-type.ts"

export const whole = {
  id: "019db533-f39d-7eef-bb81-d79b44681d2f",
  pageTypeSlug: "book",
  slug: "whole",
  title: "Whole",
  kind: "read",
  status: "not-started",
  author: "Sandra Brown",
  unitSlug: "words",
  ownLength: 167250,
} as const satisfies Book
