import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theHeartfireHealerPerdition = {
  id: "019db533-f38a-72ef-8ea6-1196007069bf",
  type: "page-type/book",
  slug: "the-heartfire-healer-perdition",
  title: "The Heartfire Healer: Perdition",
  status: "not-started",
  unit: "unit/words",
  position: 3,
  ownLength: 104250,
  publishedAt: "2022-04-26",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B09XCCLJ4R",
      externalLink: "https://amazon.com/dp/B09XCCLJ4R",
    },
  ],
  createdAt: "2026-04-22T12:39:34.026Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
