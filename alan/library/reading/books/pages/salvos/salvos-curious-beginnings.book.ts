import type { Book } from "../../book.page-type.ts"

export const salvosCuriousBeginnings = {
  id: "019db533-f391-762e-865e-bce1ecdf8688",
  pageTypeSlug: "book",
  slug: "salvos-curious-beginnings",
  title: "Salvos: Curious Beginnings",
  status: "not-started",
  unitSlug: "words",
  position: 1,
  ownLength: 102500,
  publishedAt: "2021-01-12",
  partOfSlugs: ["book-series/salvos"],
  source: "kindle",
  externalId: "B08SQD1DLR",
  externalLink: "https://amazon.com/dp/B08SQD1DLR",
} as const satisfies Book
