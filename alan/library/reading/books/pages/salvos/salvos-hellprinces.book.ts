import type { Book } from "../../book.page-type.ts"

export const salvosHellprinces = {
  id: "019db533-f391-75b8-880c-27fe4dbd669e",
  pageTypeSlug: "book",
  slug: "salvos-hellprinces",
  title: "Salvos: Hellprinces",
  status: "not-started",
  unitSlug: "words",
  position: 9,
  ownLength: 191750,
  publishedAt: "2023-02-01",
  partOfSlugs: ["book-series/salvos"],
  source: "kindle",
  externalId: "B0BH1J57WT",
  externalLink: "https://amazon.com/dp/B0BH1J57WT",
} as const satisfies Book
