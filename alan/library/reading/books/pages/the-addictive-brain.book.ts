import type { Book } from "../book.page-type.types.ts"

export const theAddictiveBrain = {
  id: "019db533-f39e-7039-86aa-8e22cca1db7a",
  pageTypeSlug: "book",
  type: "book",
  slug: "the-addictive-brain",
  title: "The Addictive Brain",
  status: "not-started",
  author: "David K. Miller, Kenneth Blum",
  unit: "words",
  ownLength: 94800,
} as const satisfies Book
