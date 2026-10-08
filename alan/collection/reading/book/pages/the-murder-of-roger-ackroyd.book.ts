import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theMurderOfRogerAckroyd = {
  id: "019db533-f399-7d20-a39b-e21519369061",
  type: "page-type/book",
  slug: "the-murder-of-roger-ackroyd",
  title: "The Murder of Roger Ackroyd",
  status: "not-started",
  author: "Agatha Christie",
  unit: "unit/words",
  position: 4,
  ownLength: 72000,
  createdAt: "2026-04-22T12:39:34.041Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
