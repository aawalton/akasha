import type { Book } from "../../book.page-type.ts"

export const theBadGuysTrickOfTheNight = {
  id: "019db533-f391-77a4-961b-b752c5eade24",
  pageTypeSlug: "book",
  slug: "the-bad-guys-trick-of-the-night",
  title: "The Bad Guys: Trick Of The Night",
  kind: "read",
  status: "not-started",
  unitSlug: "words",
  position: 8,
  ownLength: 88000,
  publishedAt: "2022-01-29",
  source: "kindle",
  externalId: "B09FMQHQWZ",
  externalLink: "https://amazon.com/dp/B09FMQHQWZ",
} as const satisfies Book
