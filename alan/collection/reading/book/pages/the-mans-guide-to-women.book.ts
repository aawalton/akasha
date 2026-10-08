import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theMansGuideToWomen = {
  id: "019db533-f38a-722c-936b-e9651e43b000",
  type: "page-type/book",
  slug: "the-mans-guide-to-women",
  title: "The Man's Guide to Women",
  status: "not-started",
  author:
    "John Mordechai Gottman, Julie Schwartz Gottman, Douglas Abrams, Rachel Carlton Abrams M.D., Eric Michael Summerer",
  unit: "unit/words",
  ownLength: 82000,
  publishedAt: "2016-02-02",
  createdAt: "2026-04-22T12:39:34.026Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
