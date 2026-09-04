import type { Book } from "../../book.page-type.ts"

export const hardwiringHappiness = {
  id: "019db533-f39e-724c-b506-0c3d11200cfe",
  pageTypeSlug: "book",
  slug: "hardwiring-happiness",
  title: "Hardwiring Happiness",
  status: "not-started",
  author: "Hanson, Rick (Psychologist)",
  unitSlug: "words",
  ownLength: 115050,
} as const satisfies Book
