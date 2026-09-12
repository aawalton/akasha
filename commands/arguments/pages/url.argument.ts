import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const url = {
  id: "01a094c2-67e2-7a59-8b7e-97f7f846fd06",
  type: "argument",
  slug: "url",
  said: "--url",
  takes: "the origin reached",
  value: "text",
  placeholder: "origin",
} as const satisfies Argument
