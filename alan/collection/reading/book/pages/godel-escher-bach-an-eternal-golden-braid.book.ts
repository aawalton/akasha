import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const godelEscherBachAnEternalGoldenBraid = {
  id: "019db533-f39d-79fc-bcb1-58193fb074aa",
  type: "page-type/book",
  slug: "godel-escher-bach-an-eternal-golden-braid",
  title: "Godel, Escher, Bach: an Eternal Golden Braid",
  status: "paused",
  author: "Douglas R. Hofstadter",
  unit: "unit/words",
  position: 1,
  ownLength: 185500,
  ownProgress: 7250,
} as const satisfies Book
