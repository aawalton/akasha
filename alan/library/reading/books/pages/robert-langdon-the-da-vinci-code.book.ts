import type { Book } from "../book.page-type.types.ts"

export const robertLangdonTheDaVinciCode = {
  id: "019db533-f39a-7ac7-a1e9-8d0d40a5de9f",
  pageTypeSlug: "book",
  type: "book",
  slug: "robert-langdon-the-da-vinci-code",
  title: "Robert Langdon: The Da Vinci Code",
  status: "not-started",
  author: "Dan Brown",
  unit: "words",
  position: 1,
  ownLength: 124000,
  source: "kindle",
  externalId: "B000FA675C",
  externalLink: "https://www.amazon.com/dp/B000FA675C",
  lastSyncedAt: "2025-10-11",
} as const satisfies Book
