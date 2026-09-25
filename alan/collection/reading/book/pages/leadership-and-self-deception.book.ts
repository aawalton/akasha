import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const leadershipAndSelfDeception = {
  id: "019db533-f39d-7ade-b003-743385a2fc5f",
  type: "page-type/book",
  slug: "leadership-and-self-deception",
  title: "Leadership and Self-Deception",
  status: "completed",
  grade: "B",
  author: "Ivan Scott",
  unit: "unit/words",
  position: 2,
  ownLength: 42750,
  ownProgress: 42750,
} as const satisfies Book
