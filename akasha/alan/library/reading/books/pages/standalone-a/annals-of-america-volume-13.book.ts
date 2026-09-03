import type { Book } from "../../book.page-type.ts"

export const annalsOfAmericaVolume13 = {
  id: "019db533-f39d-7b9f-a9c6-7f7d2588efd5",
  pageTypeSlug: "book",
  slug: "annals-of-america-volume-13",
  title: "Annals of America Volume 13",
  kind: "read",
  status: "not-started",
  author: "WILLIAM BENTON",
  unitSlug: "words",
  position: 13,
  ownLength: 144250,
} as const satisfies Book
