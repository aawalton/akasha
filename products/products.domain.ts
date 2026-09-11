import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const products = {
  id: "01a0826b-97bb-7e70-8730-ba2745b92e2b",
  type: "domain",
  slug: "products",
  definition: "what Alan makes for people outside this system",
  parts: ["domain/archive-of-worlds", "domain/audhdalan", "domain/games"],
} as const satisfies Domain
