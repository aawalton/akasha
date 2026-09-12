import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const domain = {
  id: "01a094cf-a9b1-79b8-a44c-c196bc2a76d3",
  type: "argument",
  slug: "domain",
  said: "--domain",
  takes: "a catalog domain to collect again, said once per domain",
  value: "text",
  placeholder: "name",
} as const satisfies Argument
