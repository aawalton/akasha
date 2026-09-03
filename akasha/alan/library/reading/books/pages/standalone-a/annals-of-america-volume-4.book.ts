import type { Book } from "../../book.page-type.ts"

export const annalsOfAmericaVolume4 = {
  id: "019db533-f39d-7b03-8226-bc2ab110e4ba",
  pageTypeSlug: "book",
  slug: "annals-of-america-volume-4",
  title: "Annals of America Volume 4",
  kind: "read",
  status: "not-started",
  unitSlug: "words",
  position: 4,
  ownLength: 162750,
} as const satisfies Book
