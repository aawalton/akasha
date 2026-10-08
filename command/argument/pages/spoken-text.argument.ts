import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const spokenText = {
  id: "01a09514-2fc5-74be-bd36-a93fbafbd4db",
  type: "page-type/argument",
  slug: "spoken-text",
  said: "--text",
  takes: "the words the voice speaks",
  value: "text",
  placeholder: "utterance",
  createdAt: "2026-09-12T10:05:23.269Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument
