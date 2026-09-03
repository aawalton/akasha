import type { Book } from "../../book.page-type.ts"

export const godelEscherBachAnEternalGoldenBraid = {
  id: "019db533-f39d-79fc-bcb1-58193fb074aa",
  pageTypeSlug: "book",
  slug: "godel-escher-bach-an-eternal-golden-braid",
  title: "Godel, Escher, Bach: an Eternal Golden Braid",
  kind: "read",
  status: "paused",
  author: "Douglas R. Hofstadter",
  unitSlug: "words",
  position: 1,
  ownLength: 185500,
  ownProgress: 7250,
} as const satisfies Book
