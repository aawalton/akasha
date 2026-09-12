import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const simulator = {
  id: "01a09501-4e8d-7c82-9bd0-9faf0428e620",
  type: "argument",
  slug: "simulator",
  said: "--simulator",
  takes: "install an ios app on a simulator rather than hand it to Apple",
  value: "none",
} as const satisfies Argument
