import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const key = {
  id: "01a094cf-a4e2-728c-82f3-ebbbb7d94367",
  type: "argument",
  slug: "key",
  said: "--key",
  takes: "the one secret acted on, as the page type declares that secret",
  value: "text",
  placeholder: "name",
} as const satisfies Argument
