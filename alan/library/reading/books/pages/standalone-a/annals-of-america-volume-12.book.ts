import type { Book } from "../../book.page-type.ts"

export const annalsOfAmericaVolume12 = {
  id: "019db533-f39d-7bce-8580-7cdeafa6d53f",
  pageTypeSlug: "book",
  slug: "annals-of-america-volume-12",
  title: "Annals of America Volume 12",
  status: "not-started",
  author: "Encyclopedia Britannica",
  unitSlug: "words",
  position: 12,
  ownLength: 149750,
} as const satisfies Book
