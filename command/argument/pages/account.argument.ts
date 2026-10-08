import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const account = {
  id: "01a094e9-14d6-78a3-a639-4fec8033b086",
  type: "page-type/argument",
  slug: "account",
  said: "--account",
  takes: "the name a model account is reached by",
  value: "text",
  placeholder: "account",
  createdAt: "2026-09-12T09:18:18.326Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
