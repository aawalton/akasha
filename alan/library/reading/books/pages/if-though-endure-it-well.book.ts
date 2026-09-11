import type { Book } from "akasha/alan/library/reading/books/book.page-type.types.ts"

export const ifThoughEndureItWell = {
  id: "019db533-f39d-70d3-8936-30339eab2e6c",
  type: "book",
  slug: "if-though-endure-it-well",
  title: "If Though Endure It Well",
  status: "completed",
  rank: "C",
  author: "Edmund Husserl, Dorion Cairns",
  unit: "words",
  position: 3,
  ownLength: 53000,
  ownProgress: 53000,
} as const satisfies Book
