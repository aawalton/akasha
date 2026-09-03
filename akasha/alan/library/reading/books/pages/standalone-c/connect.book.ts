import type { Book } from "../../book.page-type.ts"

export const connect = {
  id: "019db533-f39e-716a-b79e-e7ce69613350",
  pageTypeSlug: "book",
  slug: "connect",
  title: "Connect",
  kind: "read",
  status: "not-started",
  author: "Neil Alexander Campbell, Lawrence G. Mitchell, Jane B. Reece",
  unitSlug: "words",
  ownLength: 154800,
} as const satisfies Book
