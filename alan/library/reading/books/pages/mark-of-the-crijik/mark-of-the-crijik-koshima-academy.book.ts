import type { Book } from "../../book.page-type.ts"

export const markOfTheCrijikKoshimaAcademy = {
  id: "019db533-f391-71eb-9a85-ba662b61774e",
  pageTypeSlug: "book",
  slug: "mark-of-the-crijik-koshima-academy",
  title: "Mark of the Crijik: Koshima Academy",
  status: "not-started",
  unitSlug: "words",
  position: 2,
  ownLength: 160500,
  publishedAt: "2023-01-31",
  partOfSlugs: ["book-series/mark-of-the-crijik"],
  source: "kindle",
  externalId: "B0BKN5S6L7",
  externalLink: "https://amazon.com/dp/B0BKN5S6L7",
} as const satisfies Book
