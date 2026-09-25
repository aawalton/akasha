import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const chaosSeedsFounding = {
  id: "019db533-f390-7ab3-ab76-bf813e1a7fac",
  type: "page-type/book",
  slug: "chaos-seeds-founding",
  title: "Chaos Seeds: Founding",
  status: "completed",
  grade: "B",
  author: "Aleron Kong",
  unit: "unit/words",
  position: 1,
  ownLength: 73750,
  ownProgress: 73750,
  publishedAt: "2015-11-20",
  partOfCollections: ["book-series/chaos-seeds"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0172GEB68",
      externalLink: "https://amazon.com/dp/B0172GEB68",
    },
  ],
} as const satisfies Book
