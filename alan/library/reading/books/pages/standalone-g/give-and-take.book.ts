import type { Book } from "../../book.page-type.ts"

export const giveAndTake = {
  id: "019db533-f39e-7132-9b69-3bd762783289",
  pageTypeSlug: "book",
  slug: "give-and-take",
  title: "Give and Take",
  status: "not-started",
  author: "Adam Grant, Adam M. Grant",
  unitSlug: "words",
  ownLength: 177450,
} as const satisfies Book
