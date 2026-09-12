import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const limit = {
  id: "01a094bf-1b90-7e50-b635-aa265f90bc41",
  type: "argument",
  slug: "limit",
  said: "--limit",
  takes: "the most rows the answer carries",
  value: "whole-number",
  placeholder: "n",
} as const satisfies Argument
