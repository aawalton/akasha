import type { BookRecord } from "akasha/alan/authoring/book-records/book-record.page-type.types.ts"

export const learnEverythingRotation = {
  id: "01a0657d-b91d-7900-bcf9-9b0cca35747a",
  type: "book-record",
  slug: "learn-everything-rotation",
  title: "Learn Everything — Rotation Queue",
  definition: "where each thread of Learn Everything left off",
  bookSlug: "learn-everything",
  keptBy: "ali-archivist",
  writing: "md",
} as const satisfies BookRecord
