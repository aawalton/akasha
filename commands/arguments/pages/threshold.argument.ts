import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const threshold = {
  id: "01a094cc-2580-7b02-964a-8e3748a0ba5e",
  type: "argument",
  slug: "threshold",
  said: "--threshold",
  takes: "the cutoff a row is kept in the answer by",
  value: "whole-number",
  placeholder: "n",
} as const satisfies Argument
