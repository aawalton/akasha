import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const guardianOfAsterFallBattlefieldReclaimer = {
  id: "019db533-f391-701f-bab2-b4d0ca97e8d2",
  type: "page-type/book",
  slug: "guardian-of-aster-fall-battlefield-reclaimer",
  title: "Guardian of Aster Fall: Battlefield Reclaimer",
  status: "completed",
  author: "David North",
  unit: "unit/words",
  position: 1,
  ownLength: 134250,
  ownProgress: 134250,
  publishedAt: "2021-09-03",
  partOfCollections: ["book-series/guardian-of-aster-fall"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B09CLKKF48",
      externalLink: "https://amazon.com/dp/B09CLKKF48",
    },
  ],
} as const satisfies Book
