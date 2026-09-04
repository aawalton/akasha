import type { Book } from "../../book.page-type.ts"

export const theMurderOfRogerAckroyd = {
  id: "019db533-f399-7d20-a39b-e21519369061",
  pageTypeSlug: "book",
  slug: "the-murder-of-roger-ackroyd",
  title: "The Murder of Roger Ackroyd",
  status: "not-started",
  author: "Agatha Christie",
  unitSlug: "words",
  position: 4,
  ownLength: 72000,
} as const satisfies Book
