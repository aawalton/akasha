import type { Book } from "akasha/alan/library/reading/books/book.page-type.types.ts"

export const iThoughtItWasJustMeButItIsnt = {
  id: "019db533-f39e-7162-bb30-48daf9106285",
  type: "book",
  slug: "i-thought-it-was-just-me-but-it-isnt",
  title: "I Thought It Was Just Me (but it isn't)",
  status: "not-started",
  author: "Brené Brown, Lauren Fortgang",
  unit: "words",
  ownLength: 160950,
} as const satisfies Book
