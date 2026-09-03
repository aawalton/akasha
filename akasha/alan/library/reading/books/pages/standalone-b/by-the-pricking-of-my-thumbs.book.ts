import type { Book } from "../../book.page-type.ts"

export const byThePrickingOfMyThumbs = {
  id: "019db533-f399-7d35-982b-4d4a33c8a3e6",
  pageTypeSlug: "book",
  slug: "by-the-pricking-of-my-thumbs",
  title: "By the Pricking of My Thumbs",
  kind: "read",
  status: "not-started",
  author: "Agatha Christie",
  unitSlug: "words",
  position: 4,
} as const satisfies Book
