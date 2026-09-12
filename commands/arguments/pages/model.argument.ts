import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const model = {
  id: "01a094d8-9719-7122-b2ac-75ba01434278",
  type: "argument",
  slug: "model",
  said: "--model",
  takes: "the registered checkpoint the render goes through",
  value: "text",
  placeholder: "id",
} as const satisfies Argument
