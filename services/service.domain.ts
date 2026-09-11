import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const service = {
  id: "01a05a3c-cafd-7ded-8901-f1468940d7ca",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "service",
  definition: "what the system runs without being asked each time",
  parts: [
    "page-type/service",
    "page-type/service-workstation",
    "page-type/vendored-workload",
    "page-type/web-app",
    "page-type/secret",
    "service-workstation/service-watching",
    "page-type/service-inference",
  ],
} as const satisfies Domain
