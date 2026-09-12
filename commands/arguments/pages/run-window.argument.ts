import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const runWindow = {
  id: "01a094f1-18d5-7594-a907-2d8adf4ebe84",
  type: "argument",
  slug: "run-window",
  said: "--last",
  takes: "how many of the most recent runs the numbers cover, or a period ending now",
  value: "text",
  placeholder: "window",
} as const satisfies Argument
