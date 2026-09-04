import type { Book } from "../../book.page-type.ts"

export const salvosTheChildMonster = {
  id: "019db533-f391-757f-b999-9cb04cc8f008",
  pageTypeSlug: "book",
  slug: "salvos-the-child-monster",
  title: "Salvos: The Child Monster",
  kind: "read",
  status: "not-started",
  unitSlug: "words",
  position: 12,
  ownLength: 114000,
  publishedAt: "2024-04-02",
  partOfSlugs: ["book-series/salvos"],
  source: "kindle",
  externalId: "B0CM825NXK",
  externalLink: "https://amazon.com/dp/B0CM825NXK",
} as const satisfies Book
