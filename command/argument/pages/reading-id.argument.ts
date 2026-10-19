import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const readingId = {
  id: "01a155d4-d19b-729e-9ef4-8f36f8e3d1f4",
  type: "page-type/argument",
  slug: "reading-id",
  said: "--id",
  takes: "the reading shown, named by the start of its line's id",
  value: "text",
  placeholder: "prefix",
  createdAt: "2026-10-19T20:22:53.082Z",
  updatedAt: "2026-10-19T20:22:53.082Z",
} as const satisfies Argument
