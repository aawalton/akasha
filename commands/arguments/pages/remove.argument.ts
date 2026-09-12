import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const remove = {
  id: "01a094ed-cfd7-72bf-b667-e9c1230a7a65",
  type: "argument",
  slug: "remove",
  said: "--remove",
  takes: "take away the pages this run judged stale",
  value: "none",
} as const satisfies Argument
