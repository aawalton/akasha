import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const mrsMcgintysDead = {
  id: "019db533-f399-7c55-aa66-0608f1268221",
  type: "page-type/book",
  slug: "mrs-mcgintys-dead",
  title: "Mrs McGinty's Dead",
  status: "not-started",
  author: "Agatha Christie",
  unit: "unit/words",
  position: 24,
} as const satisfies Book
