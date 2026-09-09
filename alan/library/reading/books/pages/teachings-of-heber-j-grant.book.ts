import type { Book } from "../book.page-type.ts"

export const teachingsOfHeberJGrant = {
  id: "019db533-f39d-7977-a982-e7488a4b983e",
  pageTypeSlug: "book",
  type: "book",
  slug: "teachings-of-heber-j-grant",
  title: "Teachings of Heber J. Grant",
  status: "not-started",
  author: "Staff of Publisher",
  unit: "words",
  position: 8,
  ownLength: 94000,
} as const satisfies Book
