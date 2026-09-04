import type { Book } from "../../book.page-type.ts"

export const theFabricOfReality = {
  id: "019db533-f39d-7885-8a41-01c86a4ddd43",
  pageTypeSlug: "book",
  slug: "the-fabric-of-reality",
  title: "The Fabric of Reality",
  status: "not-started",
  author: "David Deutsch",
  unitSlug: "words",
  position: 3,
  ownLength: 97500,
} as const satisfies Book
