import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const jsonInOneObject = {
  id: "01a094ce-2f34-7253-b888-a308176d5ff2",
  type: "page-type/argument",
  slug: "json-in-one-object",
  said: "--json",
  takes: "answer as one JSON object holding every line rather than one object a line",
  value: "none",
  createdAt: "2026-09-12T08:48:55.604Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
