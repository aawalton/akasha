import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const infinityBladeAwakening = {
  id: "019db533-f39d-7055-a1e7-8690066a4780",
  type: "page-type/book",
  slug: "infinity-blade-awakening",
  title: "Infinity Blade: Awakening",
  status: "completed",
  grade: "B",
  author: "Brandon Sanderson",
  unit: "unit/words",
  position: 1,
  ownLength: 37500,
  ownProgress: 37500,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B005SFRJ6K",
      externalLink: "https://www.amazon.com/dp/B005SFRJ6K",
    },
  ],
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
