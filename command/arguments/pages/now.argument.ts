import type { Argument } from "akasha/command/arguments/argument.page-type.types.ts"

export const now = {
  id: "01a09aff-243e-7678-8d8c-7d0f05795291",
  type: "argument",
  slug: "now",
  said: "--now",
  takes: "act on a live seat without waiting for the turn it is in to end",
  value: "none",
} as const satisfies Argument
