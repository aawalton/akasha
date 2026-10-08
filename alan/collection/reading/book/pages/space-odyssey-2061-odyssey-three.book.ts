import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const spaceOdyssey2061OdysseyThree = {
  id: "019db533-f39b-7425-ab5f-fd7fe43528e7",
  type: "page-type/book",
  slug: "space-odyssey-2061-odyssey-three",
  title: "Space Odyssey: 2061: Odyssey Three",
  status: "not-started",
  author: "Arthur C. Clarke",
  unit: "unit/words",
  position: 2,
  ownLength: 77000,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B07XF9ZZWG",
      externalLink: "https://www.amazon.com/dp/B07XF9ZZWG",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.043Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
