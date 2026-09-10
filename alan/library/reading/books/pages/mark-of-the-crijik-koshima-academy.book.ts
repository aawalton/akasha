import type { Book } from "../book.page-type.types.ts"

export const markOfTheCrijikKoshimaAcademy = {
  id: "019db533-f391-71eb-9a85-ba662b61774e",
  pageTypeSlug: "book",
  type: "book",
  slug: "mark-of-the-crijik-koshima-academy",
  title: "Mark of the Crijik: Koshima Academy",
  status: "not-started",
  unit: "words",
  position: 2,
  ownLength: 160500,
  publishedAt: "2023-01-31",
  partOfCollections: ["book-series/mark-of-the-crijik"],
  source: "kindle",
  externalId: "B0BKN5S6L7",
  externalLink: "https://amazon.com/dp/B0BKN5S6L7",
} as const satisfies Book
