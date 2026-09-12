import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const warm = {
  id: "01a094c7-5a34-7d70-ae76-35c857588d17",
  type: "argument",
  slug: "warm",
  said: "--warm",
  takes: "leave the app running, so the tap measures a warm open rather than a cold one",
  value: "none",
} as const satisfies Argument
