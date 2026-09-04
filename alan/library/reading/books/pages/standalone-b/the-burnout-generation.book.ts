import type { Book } from "../../book.page-type.ts"

export const theBurnoutGeneration = {
  id: "019db533-f39d-7f54-86da-4af9be2c8cd9",
  pageTypeSlug: "book",
  slug: "the-burnout-generation",
  title: "The Burnout Generation",
  kind: "read",
  status: "not-started",
  author: "Anne Helen Petersen",
  unitSlug: "words",
  ownLength: 78750,
} as const satisfies Book
