import type { AlanBook } from "akasha/alan/books/alan-book.page-type.types.ts"

export const myFaith = {
  id: "01a0659d-311d-7002-8e73-a2838c9cbd47",
  type: "alan-book",
  slug: "my-faith",
  title: "My Faith",
  description: "This is the orientation the `/talia`",
  unit: "words",
} as const satisfies AlanBook
