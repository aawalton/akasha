import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const poolService = {
  id: "01a094d0-2403-77e8-8038-ac828f3a9005",
  type: "argument",
  slug: "pool-service",
  said: "--pool-service",
  takes: "the pool service made resident",
  value: "text",
  placeholder: "name",
} as const satisfies Argument
