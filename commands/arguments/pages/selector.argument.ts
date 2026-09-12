import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const selector = {
  id: "01a094be-8dda-7ea7-8078-15f8dfa360d7",
  type: "argument",
  slug: "selector",
  said: "--selector",
  takes: "the element found by CSS in the webview",
  value: "text",
  placeholder: "css",
} as const satisfies Argument
