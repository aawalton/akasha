import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const wolfmanWarlockBibliomancer = {
  id: "019db533-f38a-7424-b6ca-e5505134ba01",
  type: "page-type/book",
  slug: "wolfman-warlock-bibliomancer",
  title: "Wolfman Warlock: Bibliomancer",
  status: "completed",
  unit: "unit/words",
  position: 1,
  ownLength: 98000,
  ownProgress: 98000,
  publishedAt: "2019-09-17",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B07VFHH2N1",
      externalLink: "https://amazon.com/dp/B07VFHH2N1",
    },
  ],
} as const satisfies Book
