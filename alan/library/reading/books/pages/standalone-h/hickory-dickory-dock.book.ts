import type { Book } from "../../book.page-type.ts"

export const hickoryDickoryDock = {
  id: "019db533-f399-7beb-8a28-da9e8f1472b1",
  pageTypeSlug: "book",
  slug: "hickory-dickory-dock",
  title: "Hickory Dickory Dock",
  kind: "read",
  status: "not-started",
  author: "Kelly Caswell",
  unitSlug: "words",
  position: 26,
} as const satisfies Book
