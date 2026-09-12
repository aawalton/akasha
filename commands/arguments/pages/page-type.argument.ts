import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const pageType = {
  id: "01a094cb-b27d-7e31-8801-889570dada1c",
  type: "argument",
  slug: "page-type",
  said: "--page-type",
  takes: "the page type the answer is said about",
  value: "text",
  placeholder: "slug",
} as const satisfies Argument
