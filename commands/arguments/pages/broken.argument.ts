import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const broken = {
  id: "01a094f9-c78e-7049-98c4-ef3456c18635",
  type: "argument",
  slug: "broken",
  said: "--broken",
  takes: "the cases the model got wrong and no others",
  value: "none",
} as const satisfies Argument
