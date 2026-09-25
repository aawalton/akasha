import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const flinxTranscendent = {
  id: "019db533-f399-7ae0-b4ee-8470d1c201a5",
  type: "page-type/book",
  slug: "flinx-transcendent",
  title: "Flinx Transcendent",
  status: "not-started",
  author: "Alan Dean Foster",
  unit: "unit/words",
  position: 14,
} as const satisfies Book
