import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theElderEmpireShadowOfKillersAndKings = {
  id: "019db533-f39a-7df4-a99b-dcd8f19e97a2",
  type: "page-type/book",
  slug: "the-elder-empire-shadow-of-killers-and-kings",
  title: "The Elder Empire - Shadow: Of Killers and Kings",
  status: "not-started",
  unit: "unit/words",
  position: 2,
  ownLength: 98000,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B087N4L8JW",
      externalLink: "https://www.amazon.com/dp/B087N4L8JW",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.042Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
