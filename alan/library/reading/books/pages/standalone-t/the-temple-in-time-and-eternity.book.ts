import type { Book } from "../../book.page-type.ts"

export const theTempleInTimeAndEternity = {
  id: "019db533-f39d-757e-8ec2-892fd05a9f7b",
  pageTypeSlug: "book",
  slug: "the-temple-in-time-and-eternity",
  title: "The Temple in Time and Eternity",
  kind: "read",
  status: "not-started",
  author: "Donald W. Parry, Stephen David Ricks",
  unitSlug: "words",
  position: 1,
  ownLength: 83500,
} as const satisfies Book
