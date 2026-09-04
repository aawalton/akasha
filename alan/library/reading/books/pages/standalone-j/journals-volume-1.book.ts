import type { Book } from "../../book.page-type.ts"

export const journalsVolume1 = {
  id: "019db533-f39d-7496-afe4-d69832a342a7",
  pageTypeSlug: "book",
  slug: "journals-volume-1",
  title: "Journals Volume 1",
  status: "not-started",
  author: "WrightGroup/McGraw-Hill",
  unitSlug: "words",
  position: 1,
} as const satisfies Book
