import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const device = {
  id: "01a09501-6289-7ad7-be99-4fc8d528a64f",
  type: "argument",
  slug: "device",
  said: "--device",
  takes: "install an ios app on the phone its page names rather than hand it to Apple",
  value: "none",
} as const satisfies Argument
