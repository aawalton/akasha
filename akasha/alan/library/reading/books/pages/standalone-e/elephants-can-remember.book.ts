import type { Book } from "../../book.page-type.ts"

export const elephantsCanRemember = {
  id: "019db533-f399-7b80-a2ed-12a3762797bb",
  pageTypeSlug: "book",
  slug: "elephants-can-remember",
  title: "Elephants Can Remember",
  kind: "read",
  status: "not-started",
  author: "Agatha Christie",
  unitSlug: "words",
  position: 32,
} as const satisfies Book
