import type { Book } from "../../book.page-type.ts"

export const theFederalist = {
  id: "019db533-f39d-78cf-8ee5-37c911a5eb2d",
  pageTypeSlug: "book",
  slug: "the-federalist",
  title: "The Federalist",
  kind: "read",
  status: "not-started",
  author: "Alexander Hamilton, James Madison, John Jay",
  unitSlug: "words",
  position: 12,
  ownLength: 147750,
} as const satisfies Book
