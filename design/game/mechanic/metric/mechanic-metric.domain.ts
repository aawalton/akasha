import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const mechanicMetric = {
  id: "01a0ca07-7078-7055-be3c-e54f9406baf1",
  type: "page-type/domain",
  slug: "mechanic-metric",
  definition: "a number about a character",
  parts: ["domain/attribute", "domain/resource"],
} as const satisfies Domain
