import type { Book } from "../../book.page-type.ts"

export const ifThoughEndureItWell = {
  id: "019db533-f39d-70d3-8936-30339eab2e6c",
  pageTypeSlug: "book",
  slug: "if-though-endure-it-well",
  title: "If Though Endure It Well",
  kind: "read",
  status: "completed",
  rank: "C",
  author: "Edmund Husserl, Dorion Cairns",
  unitSlug: "words",
  position: 3,
  ownLength: 53000,
  ownProgress: 53000,
} as const satisfies Book
