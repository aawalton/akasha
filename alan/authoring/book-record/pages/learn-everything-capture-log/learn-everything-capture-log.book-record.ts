import type { BookRecord } from "akasha/alan/authoring/book-record/book-record.page-type.types.ts"

export const learnEverythingCaptureLog = {
  id: "01a0657d-b91d-7a00-b208-da222357f276",
  type: "page-type/book-record",
  slug: "learn-everything-capture-log",
  title: "Learn Everything — Capture Log",
  definition: "what was scored into Learn Everything from outside an interview",
  book: "learn-everything",
  keptBy: "ali-recorder",
  writing: "md",
} as const satisfies BookRecord
