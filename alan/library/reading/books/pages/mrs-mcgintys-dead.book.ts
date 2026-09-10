import type { Book } from "../book.page-type.types.ts"

export const mrsMcgintysDead = {
  id: "019db533-f399-7c55-aa66-0608f1268221",
  pageTypeSlug: "book",
  type: "book",
  slug: "mrs-mcgintys-dead",
  title: "Mrs McGinty's Dead",
  status: "not-started",
  author: "Agatha Christie",
  unit: "words",
  position: 24,
} as const satisfies Book
