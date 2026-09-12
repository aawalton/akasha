import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const batch = {
  id: "01a094e6-1e6a-7e90-8d31-575d2caae9e8",
  type: "argument",
  slug: "batch",
  said: "--batch",
  takes: "how many readings one write carries, 1 to 1000",
  value: "whole-number",
  placeholder: "n",
} as const satisfies Argument
