import type { Book } from "../book.page-type.types.ts"

export const teachingsOfGordonBHinckley = {
  id: "019db533-f39d-797e-bab6-8f5cc812f4cf",
  pageTypeSlug: "book",
  type: "book",
  slug: "teachings-of-gordon-b-hinckley",
  title: "Teachings of Gordon B. Hinckley",
  status: "not-started",
  author: "Gordon Bitner Hinckley",
  unit: "words",
  position: 16,
  ownLength: 181750,
} as const satisfies Book
