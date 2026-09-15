import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const since = {
  id: "01a094cd-71fc-7f7f-8a41-add7dd246602",
  type: "page-type/argument",
  slug: "since",
  said: "--since",
  takes: "how far back the records reach, said in seconds, minutes, hours or days",
  value: "text",
  placeholder: "duration",
} as const satisfies Argument
