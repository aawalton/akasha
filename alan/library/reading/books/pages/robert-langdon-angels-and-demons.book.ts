import type { Book } from "../book.page-type.types.ts"

export const robertLangdonAngelsAndDemons = {
  id: "019db533-f39b-7210-bda7-f15206d1c22f",
  pageTypeSlug: "book",
  type: "book",
  slug: "robert-langdon-angels-and-demons",
  title: "Robert Langdon: Angels & Demons",
  status: "not-started",
  author: "Dan Brown",
  unit: "words",
  ownLength: 184000,
  source: "kindle",
  externalId: "B000FBJFSM",
  externalLink: "https://www.amazon.com/dp/B000FBJFSM",
  lastSyncedAt: "2025-10-11",
} as const satisfies Book
