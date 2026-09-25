import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const chaosSeedsRaiders = {
  id: "019db533-f390-7a7b-803c-02f6c25ba8f7",
  type: "page-type/book",
  slug: "chaos-seeds-raiders",
  title: "Chaos Seeds: Raiders",
  status: "completed",
  grade: "C",
  unit: "unit/words",
  position: 6,
  ownLength: 127500,
  ownProgress: 127500,
  publishedAt: "2017-01-28",
  partOfCollections: ["book-series/chaos-seeds"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B01N38VFHJ",
      externalLink: "https://amazon.com/dp/B01N38VFHJ",
    },
  ],
} as const satisfies Book
