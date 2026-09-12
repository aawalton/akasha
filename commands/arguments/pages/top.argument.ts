import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const top = {
  id: "01a094ca-f89b-7b31-a741-7c522f77a2aa",
  type: "argument",
  slug: "top",
  said: "--top",
  takes: "how many rows are in the answer, worst first",
  value: "whole-number",
  placeholder: "n",
} as const satisfies Argument
