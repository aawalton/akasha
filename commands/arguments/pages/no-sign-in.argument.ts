import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const noSignIn = {
  id: "01a094cc-04da-77c3-b0e9-58945ba5e825",
  type: "argument",
  slug: "no-sign-in",
  said: "--no-sign-in",
  takes: "look as nobody rather than signing in",
  value: "none",
} as const satisfies Argument
