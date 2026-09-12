import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const baseUrl = {
  id: "01a094ed-029a-7f87-b771-36ed1ab7d9cc",
  type: "argument",
  slug: "base-url",
  said: "--base-url",
  takes: "the carrier API to reach",
  value: "text",
  placeholder: "url",
} as const satisfies Argument
