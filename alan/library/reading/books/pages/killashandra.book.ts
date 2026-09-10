import type { Book } from "../book.page-type.types.ts"

export const killashandra = {
  id: "019db533-f399-7dea-99e4-927f216191b7",
  pageTypeSlug: "book",
  type: "book",
  slug: "killashandra",
  title: "Killashandra",
  status: "not-started",
  unit: "words",
} as const satisfies Book
