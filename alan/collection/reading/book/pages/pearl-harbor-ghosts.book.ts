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
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
