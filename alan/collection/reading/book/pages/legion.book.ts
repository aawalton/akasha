import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const legion = {
  id: "019db533-f39d-701c-96a8-454143ce46ef",
  type: "page-type/book",
  slug: "legion",
  title: "Legion",
  status: "not-started",
  author: "Brandon Sanderson",
  unit: "unit/words",
  position: 1,
  ownLength: 23750,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0099D4KEG",
      externalLink: "https://www.amazon.com/dp/B0099D4KEG",
    },
  ],
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
