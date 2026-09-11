import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const service = {
  id: "01a05a3c-cafd-7ded-8901-f1468940d7ca",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "service",
  definition: "what the system runs without being asked each time",
  parts: [
    "page-type/service",
    "page-type/service-cluster",
    "page-type/service-workstation",
    "page-type/vendored-workload",
    "page-type/web-app",
    "page-type/secret",
    "service-workstation/service-watching",
    "page-type/service-inference",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A kind of service is named `service` and then the thing running it.",
    },
    {
      invariantKind: "departure",
      statement: "The three kinds of service sit in folders beside each other under this domain.",
    },
  ],
} as const satisfies Domain
