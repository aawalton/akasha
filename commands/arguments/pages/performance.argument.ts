import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const performance = {
  id: "01a094f2-63f3-79dc-b708-61aaf21e7a17",
  type: "argument",
  slug: "performance",
  said: "--performance",
  takes: "the slug of the one performance to run",
  value: "text",
} as const satisfies Argument
