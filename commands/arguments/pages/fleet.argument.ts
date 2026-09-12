import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const fleet = {
  id: "01a094fb-03cf-727d-92ca-7d151cd9f49c",
  type: "argument",
  slug: "fleet",
  said: "--fleet",
  takes: "every live seat in turn rather than one named",
  value: "none",
} as const satisfies Argument
