import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const check = {
  id: "01a094f2-cd5c-745d-a0cc-a1fb5019d829",
  type: "page-type/argument",
  slug: "check",
  said: "--check",
  takes: "a check the round runs beyond the ones the audit phase names",
  value: "text",
  placeholder: "slug",
  createdAt: "2026-09-12T09:28:55.388Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
