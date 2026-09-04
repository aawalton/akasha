import type { Book } from "../../book.page-type.ts"

export const aMurderIsAnnounced = {
  id: "019db533-f399-7d40-b07a-9747b3fe8fed",
  pageTypeSlug: "book",
  slug: "a-murder-is-announced",
  title: "A Murder is Announced",
  status: "not-started",
  author: "Agatha Christie",
  unitSlug: "words",
  position: 5,
} as const satisfies Book
