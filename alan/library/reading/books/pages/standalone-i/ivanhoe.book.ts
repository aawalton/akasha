import type { Book } from "../../book.page-type.ts"

export const ivanhoe = {
  id: "019db533-f39d-79d6-acfa-9ad6ac5ce45e",
  pageTypeSlug: "book",
  slug: "ivanhoe",
  title: "Ivanhoe",
  kind: "read",
  status: "not-started",
  author: "Sir Walter Scott",
  unitSlug: "words",
  position: 8,
  ownLength: 112500,
} as const satisfies Book
