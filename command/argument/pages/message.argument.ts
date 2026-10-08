import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const message = {
  id: "01a094be-8597-782a-966e-2b752ad8b925",
  type: "page-type/argument",
  slug: "message",
  said: "--message",
  takes: "the message acted on, said as the id Gmail gives it",
  value: "text",
  placeholder: "id",
  createdAt: "2026-09-12T08:31:49.143Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
