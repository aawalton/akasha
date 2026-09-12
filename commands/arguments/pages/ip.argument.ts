import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const ip = {
  id: "01a094c2-52a7-7063-bb7c-a8e09ce22802",
  type: "argument",
  slug: "ip",
  said: "--ip",
  takes: "the address the node is reached at",
  value: "text",
  placeholder: "ip",
} as const satisfies Argument
