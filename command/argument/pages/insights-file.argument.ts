import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const insightsFile = {
  id: "01a094e5-cf0d-7679-bfe0-da2e4cbf8138",
  type: "page-type/argument",
  slug: "insights-file",
  said: "--insights-file",
  takes: "the file the insights are read from",
  value: "path",
  placeholder: "file",
  createdAt: "2026-09-12T09:14:43.853Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
