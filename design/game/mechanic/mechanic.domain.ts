import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const mechanic = {
  id: "01a0c9cc-0a1c-738e-b576-26e22d6c3837",
  type: "page-type/domain",
  slug: "mechanic",
  definition: "a rule a game runs the same way every time",
  parts: ["domain/attribute", "domain/resource"],
} as const satisfies Domain
