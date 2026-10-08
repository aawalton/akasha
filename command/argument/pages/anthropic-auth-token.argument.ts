import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const anthropicAuthToken = {
  id: "01a094eb-ec55-71c5-ba64-12d7372a51f1",
  type: "page-type/argument",
  slug: "anthropic-auth-token",
  said: "--anthropic-auth-token",
  takes: "the token the seat launched here signs in with",
  value: "text",
  placeholder: "token",
  createdAt: "2026-09-12T09:21:24.565Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
