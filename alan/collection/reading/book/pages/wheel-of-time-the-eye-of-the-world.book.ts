import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const wheelOfTimeTheEyeOfTheWorld = {
  id: "019db533-f39a-7a93-8539-7d17f5c455be",
  type: "page-type/book",
  slug: "wheel-of-time-the-eye-of-the-world",
  title: "Wheel of Time: The Eye of the World",
  status: "completed",
  grade: "B",
  author: "Robert Jordan",
  unit: "unit/words",
  position: 1,
  ownLength: 188250,
  ownProgress: 188250,
  publishedAt: "2009-10-24",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B002U3CCYM",
      externalLink: "https://amazon.com/dp/B002U3CCYM",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.042Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
