import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const killashandra = {
  id: "019db533-f399-7dea-99e4-927f216191b7",
  type: "page-type/book",
  slug: "killashandra",
  title: "Killashandra",
  status: "not-started",
  unit: "unit/words",
} as const satisfies Book
