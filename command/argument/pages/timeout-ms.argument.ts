import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const timeoutMs = {
  id: "01a094cb-f138-7d04-a759-af92d5e04457",
  type: "page-type/argument",
  slug: "timeout-ms",
  said: "--timeout-ms",
  takes: "how long each wait is given, 60000 where none is said",
  value: "whole-number",
  placeholder: "ms",
  default: "60000",
  createdAt: "2026-09-12T08:46:28.664Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument
