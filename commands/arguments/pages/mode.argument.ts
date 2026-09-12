import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const mode = {
  id: "01a094d7-5d06-78d7-8654-3b9d19f5474a",
  type: "argument",
  slug: "mode",
  said: "--mode",
  takes: "whether the clip is the voice to match or a tail to carry on from",
  value: "text",
  placeholder: "how",
} as const satisfies Argument
