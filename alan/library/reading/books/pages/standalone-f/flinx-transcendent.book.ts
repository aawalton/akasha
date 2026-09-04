import type { Book } from "../../book.page-type.ts"

export const flinxTranscendent = {
  id: "019db533-f399-7ae0-b4ee-8470d1c201a5",
  pageTypeSlug: "book",
  slug: "flinx-transcendent",
  title: "Flinx Transcendent",
  status: "not-started",
  author: "Alan Dean Foster",
  unitSlug: "words",
  position: 14,
} as const satisfies Book
