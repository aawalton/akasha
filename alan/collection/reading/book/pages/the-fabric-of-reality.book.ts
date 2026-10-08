import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theFabricOfReality = {
  id: "019db533-f39d-7885-8a41-01c86a4ddd43",
  type: "page-type/book",
  slug: "the-fabric-of-reality",
  title: "The Fabric of Reality",
  status: "not-started",
  author: "David Deutsch",
  unit: "unit/words",
  position: 3,
  ownLength: 97500,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
