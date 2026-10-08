import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const typedText = {
  id: "01a094c4-f465-77b6-bc25-489201f3cbc0",
  type: "page-type/argument",
  slug: "typed-text",
  said: "--text",
  takes: "the text typed, `-` reading it from what is piped in",
  value: "text",
  placeholder: "text",
  createdAt: "2026-09-12T08:38:50.725Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument
