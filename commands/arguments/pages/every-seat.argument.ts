import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const everySeat = {
  id: "01a094ec-8243-7efa-a544-75790179ec02",
  type: "argument",
  slug: "every-seat",
  said: "--all",
  takes: "every seat akasha carries, which is the only reach a restart has",
  value: "none",
} as const satisfies Argument
