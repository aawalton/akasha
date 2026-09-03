import type { Book } from "../../book.page-type.ts"

export const connected = {
  id: "019db533-f39e-726b-ab2e-3ab319b509c4",
  pageTypeSlug: "book",
  slug: "connected",
  title: "Connected",
  kind: "read",
  status: "not-started",
  author: "Neil Alexander Campbell, Lawrence G. Mitchell, Jane B. Reece",
  unitSlug: "words",
  ownLength: 157950,
} as const satisfies Book
