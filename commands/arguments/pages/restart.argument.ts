import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const restart = {
  id: "01a094e6-82a2-7c28-8dbb-4993c43e4e8d",
  type: "argument",
  slug: "restart",
  said: "--restart",
  takes: "begin at the head of the export rather than where an earlier run ended",
  value: "none",
} as const satisfies Argument
