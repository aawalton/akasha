import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const elephantsCanRemember = {
  id: "019db533-f399-7b80-a2ed-12a3762797bb",
  type: "page-type/book",
  slug: "elephants-can-remember",
  title: "Elephants Can Remember",
  status: "not-started",
  author: "Agatha Christie",
  unit: "unit/words",
  position: 32,
} as const satisfies Book
