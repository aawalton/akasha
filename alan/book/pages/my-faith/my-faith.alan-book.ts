import type { AlanBook } from "akasha/alan/book/alan-book.page-type.types.ts"

export const myFaith = {
  id: "01a0659d-311d-7002-8e73-a2838c9cbd47",
  type: "page-type/alan-book",
  slug: "my-faith",
  definition: "what Alan believes",
  title: "My Faith",
  description: "This is the orientation the `/talia`",
  unit: "unit/words",
  createdAt: "2026-09-03T04:53:15.677Z",
  updatedAt: "2026-09-15T15:44:57.000Z",
} as const satisfies AlanBook
