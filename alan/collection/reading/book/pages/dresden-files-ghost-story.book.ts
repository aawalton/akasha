import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const dresdenFilesGhostStory = {
  id: "019db533-f39b-7095-a001-dc036d1bcf0d",
  type: "page-type/book",
  slug: "dresden-files-ghost-story",
  title: "Dresden Files: Ghost Story",
  status: "not-started",
  author: "Jim Butcher",
  unit: "unit/words",
  position: 12,
  ownLength: 151750,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B004H4XI0Y",
      externalLink: "https://www.amazon.com/dp/B004H4XI0Y",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.043Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
