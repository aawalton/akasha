import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const startMode = {
  id: "01a094e1-4465-7146-8490-eac1d8e78d76",
  type: "argument",
  slug: "start-mode",
  said: "--start-mode",
  takes: "`interactive` or `headless`, which is whether a terminal is attached",
  value: "text",
  placeholder: "mode",
} as const satisfies Argument
