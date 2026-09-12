import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const time = {
  id: "01a094e1-b6fe-78c5-bd7f-0ebd19bdf096",
  type: "argument",
  slug: "time",
  said: "--time",
  takes: "the Mountain wall clock the act happened at, read on that date",
  value: "text",
  placeholder: "HH:MM",
} as const satisfies Argument
