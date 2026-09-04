import type { Book } from "../../book.page-type.ts"

export const theMurderOnTheLinks = {
  id: "019db533-f399-7c80-af2c-3446f93fdefb",
  pageTypeSlug: "book",
  slug: "the-murder-on-the-links",
  title: "The Murder on the Links",
  status: "not-started",
  author: "Agatha Christie",
  unitSlug: "words",
  position: 2,
  ownLength: 80000,
} as const satisfies Book
