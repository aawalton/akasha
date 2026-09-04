import type { Book } from "../../book.page-type.ts"

export const understandingTheMysteriesOfHumanBehavior = {
  id: "019db533-f39d-7f4c-81dc-0e4684266b2c",
  pageTypeSlug: "book",
  slug: "understanding-the-mysteries-of-human-behavior",
  title: "Understanding the Mysteries of Human Behavior",
  kind: "read",
  status: "not-started",
  author: "Professor Mark Leary Ph.D.",
  unitSlug: "words",
  ownLength: 182700,
} as const satisfies Book
