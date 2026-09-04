import type { Book } from "../../book.page-type.ts"

export const annalsOfAmericaVolume9 = {
  id: "019db533-f39d-7bf7-af97-ad5141cb7900",
  pageTypeSlug: "book",
  slug: "annals-of-america-volume-9",
  title: "Annals of America Volume 9",
  status: "not-started",
  unitSlug: "words",
  position: 9,
  ownLength: 159750,
} as const satisfies Book
