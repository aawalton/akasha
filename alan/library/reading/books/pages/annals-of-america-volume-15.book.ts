import type { Book } from "../book.page-type.types.ts"

export const annalsOfAmericaVolume15 = {
  id: "019db533-f39d-7b23-b789-46cb4fd1fe7f",
  pageTypeSlug: "book",
  type: "book",
  slug: "annals-of-america-volume-15",
  title: "Annals of America Volume 15",
  status: "not-started",
  author: "Editors",
  unit: "words",
  position: 15,
  ownLength: 150500,
} as const satisfies Book
