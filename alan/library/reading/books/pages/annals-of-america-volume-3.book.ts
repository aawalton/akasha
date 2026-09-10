import type { Book } from "../book.page-type.types.ts"

export const annalsOfAmericaVolume3 = {
  id: "019db533-f39d-7b1b-ba93-5fffd5865f5a",
  pageTypeSlug: "book",
  type: "book",
  slug: "annals-of-america-volume-3",
  title: "Annals of America Volume 3",
  status: "not-started",
  author: "WILLIAM BENTON",
  unit: "words",
  position: 3,
  ownLength: 155000,
} as const satisfies Book
