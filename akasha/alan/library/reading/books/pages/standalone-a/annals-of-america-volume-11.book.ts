import type { Book } from "../../book.page-type.ts"

export const annalsOfAmericaVolume11 = {
  id: "019db533-f39d-7afc-9104-bfdd048cfd45",
  pageTypeSlug: "book",
  slug: "annals-of-america-volume-11",
  title: "Annals of America Volume 11",
  kind: "read",
  status: "not-started",
  unitSlug: "words",
  position: 11,
  ownLength: 146000,
} as const satisfies Book
