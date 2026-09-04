import type { Book } from "../../book.page-type.ts"

export const mrsMcgintysDead = {
  id: "019db533-f399-7c55-aa66-0608f1268221",
  pageTypeSlug: "book",
  slug: "mrs-mcgintys-dead",
  title: "Mrs McGinty's Dead",
  kind: "read",
  status: "not-started",
  author: "Agatha Christie",
  unitSlug: "words",
  position: 24,
} as const satisfies Book
