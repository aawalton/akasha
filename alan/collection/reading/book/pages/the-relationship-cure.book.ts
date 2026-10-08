import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theRelationshipCure = {
  id: "019db533-f39d-7e66-8fff-e08af2d7ee64",
  type: "page-type/book",
  slug: "the-relationship-cure",
  title: "The Relationship Cure",
  status: "completed",
  author: "John Mordechai Gottman, Joan Declaire",
  unit: "unit/words",
  ownLength: 86700,
  ownProgress: 86700,
  publishedAt: "2001-05-22",
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
