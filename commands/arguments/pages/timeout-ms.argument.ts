import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const timeoutMs = {
  id: "01a094cb-f138-7d04-a759-af92d5e04457",
  type: "argument",
  slug: "timeout-ms",
  said: "--timeout-ms",
  takes: "how long each wait is given, 60000 where none is said",
  value: "whole-number",
  placeholder: "ms",
  default: "60000",
} as const satisfies Argument
