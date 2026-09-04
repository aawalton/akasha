import type { Book } from "../../book.page-type.ts"

export const annalsOfAmericaVolume18 = {
  id: "019db533-f39d-7ba7-9ab3-5716feafc0c4",
  pageTypeSlug: "book",
  slug: "annals-of-america-volume-18",
  title: "Annals of America Volume 18",
  kind: "read",
  status: "not-started",
  unitSlug: "words",
  position: 18,
  ownLength: 170250,
} as const satisfies Book
