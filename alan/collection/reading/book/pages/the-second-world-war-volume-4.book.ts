import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theSecondWorldWarVolume4 = {
  id: "019db533-f39d-73cc-93f2-60eac07df87c",
  type: "page-type/book",
  slug: "the-second-world-war-volume-4",
  title: "The Second World War Volume 4",
  status: "not-started",
  author: "Winston S. Churchill",
  unit: "unit/words",
  position: 4,
  ownLength: 240000,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
