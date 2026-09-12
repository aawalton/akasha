import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const itemlink = {
  id: "01a094d4-7803-7d5d-a6f8-3c8627025a12",
  type: "argument",
  slug: "itemlink",
  said: "--itemlink",
  takes: "give the trace back only where its item link is this one",
  value: "text",
  placeholder: "link",
} as const satisfies Argument
