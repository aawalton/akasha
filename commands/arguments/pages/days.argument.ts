import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const days = {
  id: "01a094e3-1172-7dac-a5ef-b325118393aa",
  type: "argument",
  slug: "days",
  said: "--days",
  takes: "how many days back the trailing window reaches",
  value: "whole-number",
  placeholder: "n",
} as const satisfies Argument
