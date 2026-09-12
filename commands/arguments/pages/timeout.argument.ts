import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const timeout = {
  id: "01a09484-58e2-7701-bb2c-09511000f548",
  type: "argument",
  slug: "timeout",
  said: "--timeout",
  takes: "how many seconds the wait runs for",
  value: "whole-number",
  placeholder: "s",
} as const satisfies Argument
