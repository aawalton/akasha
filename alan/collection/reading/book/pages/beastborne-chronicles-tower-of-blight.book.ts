import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const beastborneChroniclesTowerOfBlight = {
  id: "019db533-f390-790e-b4d4-77bb593d07df",
  type: "page-type/book",
  slug: "beastborne-chronicles-tower-of-blight",
  title: "Beastborne Chronicles: Tower of Blight",
  status: "completed",
  unit: "unit/words",
  position: 6,
  ownLength: 144500,
  ownProgress: 144500,
  publishedAt: "2024-08-01",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0D7572GMZ",
      externalLink: "https://amazon.com/dp/B0D7572GMZ",
    },
  ],
  createdAt: "2026-04-22T12:39:34.032Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
