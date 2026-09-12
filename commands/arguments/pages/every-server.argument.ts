import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const everyServer = {
  id: "01a094ee-d568-7826-b487-afe7f1c064ba",
  type: "argument",
  slug: "every-server",
  said: "--all",
  takes: "every server a state file tracks, in place of naming one",
  value: "none",
} as const satisfies Argument
