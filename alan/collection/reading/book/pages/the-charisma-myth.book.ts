import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theCharismaMyth = {
  id: "019db533-f39d-7e8f-80e3-a8ba3ee4bbce",
  type: "page-type/book",
  slug: "the-charisma-myth",
  title: "The Charisma Myth",
  status: "not-started",
  author: "Olivia Fox Cabane, Olivia Cabane, Lisa Cordileone",
  unit: "unit/words",
  ownLength: 124950,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
