import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const spokenText = {
  id: "01a09514-2fc5-74be-bd36-a93fbafbd4db",
  type: "argument",
  slug: "spoken-text",
  said: "--text",
  takes: "the words the voice speaks",
  value: "text",
  placeholder: "utterance",
} as const satisfies Argument
