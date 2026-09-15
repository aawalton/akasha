import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const day = {
  id: "01a094ad-ff5c-7170-bc57-c68f0b78617c",
  type: "page-type/argument",
  slug: "day",
  said: "--day",
  takes: "which day to act on, written as that day's own date",
  value: "text",
  placeholder: "date",
} as const satisfies Argument
