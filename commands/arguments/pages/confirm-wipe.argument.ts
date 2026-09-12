import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const confirmWipe = {
  id: "01a094ea-1bfb-70cc-8702-09fbbd2a54a5",
  type: "argument",
  slug: "confirm-wipe",
  said: "--confirm-wipe",
  takes: "the acknowledgement that the install disk is overwritten",
  value: "none",
} as const satisfies Argument
