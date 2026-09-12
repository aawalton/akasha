import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const wait = {
  id: "01a094c7-eac4-7a5e-ba34-2098bfa5071d",
  type: "argument",
  slug: "wait",
  said: "--wait",
  takes: "hold until the build is valid or has failed rather than answering once",
  value: "none",
} as const satisfies Argument
