import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const open = {
  id: "01a094df-a489-7d5d-94ca-6c2966028139",
  type: "argument",
  slug: "open",
  said: "--open",
  takes: "the stretch to act on, which is the one that is open",
  value: "none",
} as const satisfies Argument
