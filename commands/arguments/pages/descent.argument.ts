import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const descent = {
  id: "01a094f8-36bb-70ba-973f-029fc26dfb1c",
  type: "argument",
  slug: "descent",
  said: "--descent",
  takes: "every page type extending `domain` as well as `domain` itself",
  value: "none",
} as const satisfies Argument
