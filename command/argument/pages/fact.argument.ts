import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const fact = {
  id: "01a0def0-832f-7d10-8475-48bdb90a6aaa",
  type: "page-type/argument",
  slug: "fact",
  said: "--fact",
  takes: "one fact, word for word as its lore page states it",
  value: "text",
  placeholder: "text",
} as const satisfies Argument
