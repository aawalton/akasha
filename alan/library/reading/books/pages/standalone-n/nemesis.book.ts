import type { Book } from "../../book.page-type.ts"

export const nemesis = {
  id: "019db533-f399-7b8a-a6f4-f193708a01de",
  pageTypeSlug: "book",
  slug: "nemesis",
  title: "Nemesis",
  status: "not-started",
  author: "Agatha Christie",
  unitSlug: "words",
  position: 12,
} as const satisfies Book
