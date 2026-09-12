import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const path = {
  id: "01a094cb-9e61-71c3-973d-452271b79ba4",
  type: "argument",
  slug: "path",
  said: "--path",
  takes: "the path fetched under the origin",
  value: "text",
  placeholder: "path",
} as const satisfies Argument
