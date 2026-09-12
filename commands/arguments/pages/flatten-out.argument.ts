import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const flattenOut = {
  id: "01a0950d-dab9-7243-ab5c-18afd60c18c6",
  type: "argument",
  slug: "flatten-out",
  said: "--flatten-out",
  takes: "where that flattened image is written",
  value: "path",
  placeholder: "path",
} as const satisfies Argument
