import type { Book } from "../../book.page-type.ts"

export const iThoughtItWasJustMeButItIsnt = {
  id: "019db533-f39e-7162-bb30-48daf9106285",
  pageTypeSlug: "book",
  slug: "i-thought-it-was-just-me-but-it-isnt",
  title: "I Thought It Was Just Me (but it isn't)",
  kind: "read",
  status: "not-started",
  author: "Brené Brown, Lauren Fortgang",
  unitSlug: "words",
  ownLength: 160950,
} as const satisfies Book
