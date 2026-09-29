import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const chapterLimit = {
  id: "01a0eb0e-4c4e-7618-b5f7-661dac0f2b35",
  type: "page-type/argument",
  slug: "chapter-limit",
  said: "--limit",
  takes: "the most chapters one run joins, the earliest first",
  value: "whole-number",
  placeholder: "n",
} as const satisfies Argument
