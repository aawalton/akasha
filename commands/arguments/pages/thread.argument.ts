import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const thread = {
  id: "01a094ef-17b6-77d7-b778-986a50768909",
  type: "argument",
  slug: "thread",
  said: "--thread",
  takes: "the thread the message joins",
  value: "text",
  placeholder: "id",
} as const satisfies Argument
