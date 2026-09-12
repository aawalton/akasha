import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const reference = {
  id: "01a094d2-10df-7a75-be29-43169fc495e0",
  type: "argument",
  slug: "reference",
  said: "--reference",
  takes: "the identity each frame is measured against",
  value: "path",
  placeholder: "png",
} as const satisfies Argument
