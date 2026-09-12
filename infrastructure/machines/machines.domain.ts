import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const machines = {
  id: "01a06596-0000-7000-8000-000000000301",
  type: "domain",
  slug: "machines",
  definition: "the machines Alan owns and what they are worth running",
  parts: ["domain/provisioning", "page-type/cluster", "page-type/computer", "page-type/host"],
} as const satisfies Domain
