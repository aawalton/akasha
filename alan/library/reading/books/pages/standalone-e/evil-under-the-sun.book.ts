import type { Book } from "../../book.page-type.ts"

export const evilUnderTheSun = {
  id: "019db533-f399-7c35-97c8-f390898a5502",
  pageTypeSlug: "book",
  slug: "evil-under-the-sun",
  title: "Evil Under the Sun",
  status: "not-started",
  author: "Agatha Christie",
  unitSlug: "words",
  position: 20,
} as const satisfies Book
