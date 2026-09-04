import type { Book } from "../../book.page-type.ts"

export const theMovingFinger = {
  id: "019db533-f399-7c4a-847f-5ac2c2baa8df",
  pageTypeSlug: "book",
  slug: "the-moving-finger",
  title: "The Moving Finger",
  status: "not-started",
  author: "Agatha Christie",
  unitSlug: "words",
  position: 4,
} as const satisfies Book
