import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const poolService = {
  id: "01a094d0-2403-77e8-8038-ac828f3a9005",
  type: "page-type/argument",
  slug: "pool-service",
  said: "--pool-service",
  takes: "the pool service made resident",
  value: "text",
  placeholder: "name",
  createdAt: "2026-09-12T08:51:03.811Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument
