import type { Domain } from "../domain-system/domain/domain.page-type.ts"

export const serviceSystem = {
  id: "01a05a3c-cafd-7ded-8901-f1468940d7ca",
  pageTypeSlug: "domain",
  slug: "service-system",
  definition: "what the system runs without being asked each time",
  partSlugs: [
    "page-type/service",
    "page-type/workstation-service",
    "page-type/cluster-service",
    "module/unit-writing",
  ],
} as const satisfies Domain
