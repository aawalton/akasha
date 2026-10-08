import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const selector = {
  id: "01a094be-8dda-7ea7-8078-15f8dfa360d7",
  type: "page-type/argument",
  slug: "selector",
  said: "--selector",
  takes: "the element found by CSS in the webview",
  value: "text",
  placeholder: "css",
  createdAt: "2026-09-12T08:31:51.258Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument
