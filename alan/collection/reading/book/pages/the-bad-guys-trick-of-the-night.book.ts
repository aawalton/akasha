import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theBadGuysTrickOfTheNight = {
  id: "019db533-f391-77a4-961b-b752c5eade24",
  type: "page-type/book",
  slug: "the-bad-guys-trick-of-the-night",
  title: "The Bad Guys: Trick Of The Night",
  status: "not-started",
  unit: "unit/words",
  position: 8,
  ownLength: 88000,
  publishedAt: "2022-01-29",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B09FMQHQWZ",
      externalLink: "https://amazon.com/dp/B09FMQHQWZ",
    },
  ],
} as const satisfies Book
