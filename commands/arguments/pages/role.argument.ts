import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const role = {
  id: "01a094e6-e0f0-70a0-98b4-057e2016a0f5",
  type: "argument",
  slug: "role",
  said: "--role",
  takes: "what this seat does, outranking the persona's own role",
  value: "text",
  placeholder: "slug",
} as const satisfies Argument
