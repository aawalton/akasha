import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const matteOut = {
  id: "01a0950c-49c2-70ae-87c9-53b1d7e6c4bf",
  type: "argument",
  slug: "matte-out",
  said: "--matte-out",
  takes: "where the eight-bit alpha matte is written",
  value: "path",
  placeholder: "path",
} as const satisfies Argument
