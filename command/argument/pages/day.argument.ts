import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const day = {
  id: "01a094ad-ff5c-7170-bc57-c68f0b78617c",
  type: "page-type/argument",
  slug: "day",
  said: "--day",
  takes: "which day to act on, written as that day's own date",
  value: "text",
  placeholder: "date",
  createdAt: "2026-09-12T08:13:46.204Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
