import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const ref = {
  id: "01a09500-879f-7054-b873-04f45e7a2881",
  type: "argument",
  slug: "ref",
  said: "--ref",
  takes: "the commit to put up",
  value: "text",
  placeholder: "rev",
} as const satisfies Argument
