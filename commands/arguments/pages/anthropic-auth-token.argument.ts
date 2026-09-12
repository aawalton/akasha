import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const anthropicAuthToken = {
  id: "01a094eb-ec55-71c5-ba64-12d7372a51f1",
  type: "argument",
  slug: "anthropic-auth-token",
  said: "--anthropic-auth-token",
  takes: "the token the seat launched here signs in with",
  value: "text",
  placeholder: "token",
} as const satisfies Argument
