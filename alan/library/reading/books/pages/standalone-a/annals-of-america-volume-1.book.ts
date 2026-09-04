import type { Book } from "../../book.page-type.ts"

export const annalsOfAmericaVolume1 = {
  id: "019db533-f39d-7c6e-9caf-60ec5197245a",
  pageTypeSlug: "book",
  slug: "annals-of-america-volume-1",
  title: "Annals of America Volume 1",
  kind: "read",
  status: "completed",
  rank: "C",
  author: "WILLIAM BENTON",
  unitSlug: "words",
  position: 1,
  ownLength: 131500,
  ownProgress: 131500,
} as const satisfies Book
