import type { Book } from "../../book.page-type.ts"

export const murderInMesopotamia = {
  id: "019db533-f399-7d2a-8669-1b9f79c101cc",
  pageTypeSlug: "book",
  slug: "murder-in-mesopotamia",
  title: "Murder in Mesopotamia",
  kind: "read",
  status: "not-started",
  author: "Agatha Christie",
  unitSlug: "words",
  position: 13,
} as const satisfies Book
