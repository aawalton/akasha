import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const settledCheck = {
  id: "01a0de28-48fb-76f5-8c76-9db70f1b1a5b",
  type: "page-type/argument",
  slug: "settled-check",
  said: "--check",
  takes: "the check a roll is settled by",
  value: "text",
  placeholder: "slug",
} as const satisfies Argument
