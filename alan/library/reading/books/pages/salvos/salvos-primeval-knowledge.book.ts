import type { Book } from "../../book.page-type.ts"

export const salvosPrimevalKnowledge = {
  id: "019db533-f391-75e5-bf0b-7016c7fa3cff",
  pageTypeSlug: "book",
  slug: "salvos-primeval-knowledge",
  title: "Salvos: Primeval Knowledge",
  kind: "read",
  status: "not-started",
  unitSlug: "words",
  position: 4,
  ownLength: 197750,
  publishedAt: "2021-12-02",
  partOfSlugs: ["book-series/salvos"],
  source: "kindle",
  externalId: "B09BMPYZXF",
  externalLink: "https://amazon.com/dp/B09BMPYZXF",
} as const satisfies Book
