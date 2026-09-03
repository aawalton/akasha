import type { Book } from "../../book.page-type.ts"

export const emotionalSuccess = {
  id: "019db533-f39e-719e-8a8e-c622a20a6456",
  pageTypeSlug: "book",
  slug: "emotional-success",
  title: "Emotional Success",
  kind: "read",
  status: "not-started",
  author: "David DeSteno",
  unitSlug: "words",
  ownLength: 110550,
} as const satisfies Book
