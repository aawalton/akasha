import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const pearlHarborGhosts = {
  id: "019db533-f39d-798d-b07c-dc0cd9266c49",
  type: "page-type/book",
  slug: "pearl-harbor-ghosts",
  title: "Pearl Harbor Ghosts",
  status: "not-started",
  author: "Thurston Clarke",
  unit: "unit/words",
  position: 10,
  ownLength: 64750,
} as const satisfies Book
