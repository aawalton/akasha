import type { Book } from "../../book.page-type.ts"

export const annalsOfAmericaVolume7 = {
  id: "019db533-f39d-7b6d-9f2e-8836ce43b998",
  pageTypeSlug: "book",
  slug: "annals-of-america-volume-7",
  title: "Annals of America Volume 7",
  kind: "read",
  status: "not-started",
  author: "Inc Encyclopaedia Britannica",
  unitSlug: "words",
  position: 7,
  ownLength: 140750,
} as const satisfies Book
