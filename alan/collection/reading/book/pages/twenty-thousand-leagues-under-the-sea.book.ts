import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const twentyThousandLeaguesUnderTheSea = {
  id: "019db533-f39d-75f6-becd-c9ba8718c6bd",
  type: "page-type/book",
  slug: "twenty-thousand-leagues-under-the-sea",
  title: "Twenty Thousand Leagues Under the Sea",
  status: "not-started",
  author: "ColorLab ColorLab Series (bogus 'author'), Jules Verne",
  unit: "unit/words",
  position: 1,
  ownLength: 81250,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
