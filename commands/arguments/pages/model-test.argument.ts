import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const modelTest = {
  id: "01a094f8-d52b-7549-a196-fde55248c83d",
  type: "argument",
  slug: "model-test",
  said: "--test",
  takes: "the model test whose prompt is put to the model",
  value: "text",
  placeholder: "test",
} as const satisfies Argument
