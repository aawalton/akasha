import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const text = {
  id: "01a094ec-dc4e-76d2-a14b-9bde5cd89a81",
  type: "page-type/argument",
  slug: "text",
  said: "--text",
  takes: "the message body",
  value: "text",
  placeholder: "body",
  createdAt: "2026-09-12T09:22:25.998Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument
