import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const pod = {
  id: "01a094eb-2b5e-7dc3-a279-52a2d84c74b3",
  type: "argument",
  slug: "pod",
  said: "--pod",
  takes: "the pod name to match as a prefix, read as a literal string",
  value: "text",
  placeholder: "name",
} as const satisfies Argument
