import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const contextLines = {
  id: "01a0d95d-0561-72cb-887b-faf66fca37e4",
  type: "page-type/argument",
  slug: "context-lines",
  said: "--context-lines",
  takes: "how many lines before and after each match are shown",
  value: "whole-number",
  placeholder: "lines",
} as const satisfies Argument
