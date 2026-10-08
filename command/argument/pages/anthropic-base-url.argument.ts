import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const anthropicBaseUrl = {
  id: "01a094eb-87ae-71d8-aced-8478581cc755",
  type: "page-type/argument",
  slug: "anthropic-base-url",
  said: "--anthropic-base-url",
  takes: "the base address the seat launched here calls",
  value: "text",
  placeholder: "url",
  createdAt: "2026-09-12T09:20:58.798Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
