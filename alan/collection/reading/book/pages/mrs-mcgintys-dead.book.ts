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
  createdAt: "2026-04-22T12:39:34.041Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
