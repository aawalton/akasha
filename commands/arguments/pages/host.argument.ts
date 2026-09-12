import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const host = {
  id: "01a094d0-8287-7d0d-be5c-e374fa79fa5e",
  type: "argument",
  slug: "host",
  said: "--host",
  takes: "which GPU the work runs on",
  value: "text",
  placeholder: "where",
} as const satisfies Argument
