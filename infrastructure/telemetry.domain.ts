import type { Domain } from "../domain-system/domains/domain.page-type.ts"

export const telemetry = {
  id: "01a0658b-0f02-79eb-aed4-e7e8b92bc117",
  pageTypeSlug: "domain",
  slug: "telemetry",
  definition: "somewhere a program records what it is doing",
  partSlugs: ["domain/log", "domain/metric"],
} as const satisfies Domain
