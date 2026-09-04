import type { Book } from "../../book.page-type.ts"

export const journalsVolume2 = {
  id: "019db533-f39d-7511-8e28-87d68fefa8b5",
  pageTypeSlug: "book",
  slug: "journals-volume-2",
  title: "Journals Volume 2",
  kind: "read",
  status: "not-started",
  author: "WrightGroup/McGraw-Hill",
  unitSlug: "words",
  position: 2,
} as const satisfies Book
