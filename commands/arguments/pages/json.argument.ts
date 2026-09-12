import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const json = {
  id: "01a0946f-ef85-7227-9a41-5893593f049e",
  type: "argument",
  slug: "json",
  said: "--json",
  takes: "answer as JSON rather than as the lines a reader takes",
  value: "none",
} as const satisfies Argument
