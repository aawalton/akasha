import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const last = {
  id: "01a094e0-b146-735c-bd24-e7384eddc88a",
  type: "argument",
  slug: "last",
  said: "--last",
  takes: "the stretch to act on, which is the one that ended last",
  value: "none",
} as const satisfies Argument
