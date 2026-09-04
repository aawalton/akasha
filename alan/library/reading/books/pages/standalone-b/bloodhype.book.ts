import type { Book } from "../../book.page-type.ts"

export const bloodhype = {
  id: "019db533-f399-7a95-ba54-2e07c8a1e1ff",
  pageTypeSlug: "book",
  slug: "bloodhype",
  title: "Bloodhype",
  kind: "read",
  status: "not-started",
  author: "Alan Dean Foster",
  unitSlug: "words",
  position: 5,
} as const satisfies Book
