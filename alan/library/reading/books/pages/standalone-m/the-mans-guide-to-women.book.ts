import type { Book } from "../../book.page-type.ts"

export const theMansGuideToWomen = {
  id: "019db533-f38a-722c-936b-e9651e43b000",
  pageTypeSlug: "book",
  slug: "the-mans-guide-to-women",
  title: "The Man's Guide to Women",
  status: "not-started",
  author:
    "John Mordechai Gottman, Julie Schwartz Gottman, Douglas Abrams, Rachel Carlton Abrams M.D., Eric Michael Summerer",
  unitSlug: "words",
  ownLength: 82000,
  publishedAt: "2016-02-02",
} as const satisfies Book
