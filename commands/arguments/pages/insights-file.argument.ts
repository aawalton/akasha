import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const insightsFile = {
  id: "01a094e5-cf0d-7679-bfe0-da2e4cbf8138",
  type: "argument",
  slug: "insights-file",
  said: "--insights-file",
  takes: "the file the insights are read from",
  value: "path",
  placeholder: "file",
} as const satisfies Argument
