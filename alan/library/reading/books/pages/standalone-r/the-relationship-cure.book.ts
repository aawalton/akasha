import type { Book } from "../../book.page-type.ts"

export const theRelationshipCure = {
  id: "019db533-f39d-7e66-8fff-e08af2d7ee64",
  pageTypeSlug: "book",
  slug: "the-relationship-cure",
  title: "The Relationship Cure",
  kind: "read",
  status: "completed",
  author: "John Mordechai Gottman, Joan Declaire",
  unitSlug: "words",
  ownLength: 86700,
  ownProgress: 86700,
  publishedAt: "2001-05-22",
} as const satisfies Book
