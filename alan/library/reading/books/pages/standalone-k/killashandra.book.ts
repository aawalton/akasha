import type { Book } from "../../book.page-type.ts"

export const killashandra = {
  id: "019db533-f399-7dea-99e4-927f216191b7",
  pageTypeSlug: "book",
  slug: "killashandra",
  title: "Killashandra",
  kind: "read",
  status: "not-started",
  unitSlug: "words",
} as const satisfies Book
