import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const jsonInOneObject = {
  id: "01a094ce-2f34-7253-b888-a308176d5ff2",
  type: "argument",
  slug: "json-in-one-object",
  said: "--json",
  takes: "answer as one JSON object holding every line rather than one object a line",
  value: "none",
} as const satisfies Argument
