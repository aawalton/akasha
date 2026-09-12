import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const output = {
  id: "01a09483-ce82-7c0d-864c-265c58941538",
  type: "argument",
  slug: "output",
  said: "--output",
  takes: "where what this command makes is written",
  value: "path",
  placeholder: "path",
} as const satisfies Argument
