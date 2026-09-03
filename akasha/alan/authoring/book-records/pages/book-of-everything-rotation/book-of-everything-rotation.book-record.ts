import type { BookRecord } from "../../book-record.page-type.ts"

export const bookOfEverythingRotation = {
  id: "01a0657d-b91d-7900-bcf9-9b0cca35747a",
  pageTypeSlug: "book-record",
  slug: "book-of-everything-rotation",
  title: "Book of Everything — Rotation Queue",
  definition: "where each thread of the Book of Everything left off",
  bookSlug: "book-of-everything",
  keptBy: "ali-archivist",
  writing: "md",
} as const satisfies BookRecord
