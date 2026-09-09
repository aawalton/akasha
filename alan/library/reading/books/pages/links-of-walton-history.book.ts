import type { Book } from "../book.page-type.ts"

export const linksOfWaltonHistory = {
  id: "019db533-f39d-7aaf-bede-a7518b011603",
  pageTypeSlug: "book",
  type: "book",
  slug: "links-of-walton-history",
  title: "Links of Walton History",
  status: "paused",
  unit: "words",
  position: 2,
  ownLength: 96500,
  ownProgress: 3250,
} as const satisfies Book
