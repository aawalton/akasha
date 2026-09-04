import type { Book } from "../../book.page-type.ts"

export const salvosSacrifices = {
  id: "019db533-f391-7595-b938-9a457a50c2ba",
  pageTypeSlug: "book",
  slug: "salvos-sacrifices",
  title: "Salvos: Sacrifices",
  kind: "read",
  status: "not-started",
  author: "Keith Jones",
  unitSlug: "words",
  position: 14,
  ownLength: 72750,
  publishedAt: "2025-05-02",
  partOfSlugs: ["book-series/salvos"],
  source: "kindle",
  externalId: "B0DNFKQ25Z",
  externalLink: "https://amazon.com/dp/B0DNFKQ25Z",
} as const satisfies Book
