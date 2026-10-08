import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const shadowsOfSelf = {
  id: "019db533-f39d-7216-b217-41d019bc4919",
  type: "page-type/book",
  slug: "shadows-of-self",
  title: "Shadows of Self",
  status: "not-started",
  author: "Brandon Sanderson",
  unit: "unit/words",
  position: 6,
  ownLength: 90250,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B00R697CGS",
      externalLink: "https://www.amazon.com/dp/B00R697CGS",
    },
  ],
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
