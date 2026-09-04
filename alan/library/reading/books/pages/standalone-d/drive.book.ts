import type { Book } from "../../book.page-type.ts"

export const drive = {
  id: "019db533-f39e-723c-986f-bfe728b5cfb5",
  pageTypeSlug: "book",
  slug: "drive",
  title: "Drive",
  kind: "read",
  status: "not-started",
  author: "Daniel H. Pink",
  unitSlug: "words",
  ownLength: 88200,
} as const satisfies Book
