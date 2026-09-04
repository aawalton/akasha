import type { Book } from "../../book.page-type.ts"

export const theCharismaMyth = {
  id: "019db533-f39d-7e8f-80e3-a8ba3ee4bbce",
  pageTypeSlug: "book",
  slug: "the-charisma-myth",
  title: "The Charisma Myth",
  status: "not-started",
  author: "Olivia Fox Cabane, Olivia Cabane, Lisa Cordileone",
  unitSlug: "words",
  ownLength: 124950,
} as const satisfies Book
