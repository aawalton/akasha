import type { Book } from "../../book.page-type.ts"

export const journalsVolume4 = {
  id: "019db533-f39d-745b-a8a7-ccab5497396f",
  pageTypeSlug: "book",
  slug: "journals-volume-4",
  title: "Journals Volume 4",
  kind: "read",
  status: "not-started",
  author: "Charles Ammi Cutter, Library Association",
  unitSlug: "words",
  position: 4,
} as const satisfies Book
