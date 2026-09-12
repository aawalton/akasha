import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const anthropicBaseUrl = {
  id: "01a094eb-87ae-71d8-aced-8478581cc755",
  type: "argument",
  slug: "anthropic-base-url",
  said: "--anthropic-base-url",
  takes: "the base address the seat launched here calls",
  value: "text",
  placeholder: "url",
} as const satisfies Argument
