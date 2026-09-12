import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const staleAfterHours = {
  id: "01a094d1-844b-7dc6-bc52-0066add1a813",
  type: "argument",
  slug: "stale-after-hours",
  said: "--stale-after-hours",
  takes: "how far behind the log frontier an entry is before it counts as stale",
  value: "whole-number",
  placeholder: "n",
} as const satisfies Argument
