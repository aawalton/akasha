import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const service = {
  id: "01a05a3c-cafd-7ded-8901-f1468940d7ca",
  type: "domain",
  slug: "service",
  definition: "what the system runs without being asked each time",
  parts: [
    "module/deploy-choosing",
    "module/deploy-looping",
    "module/deploy-subject-listing",
    "module/deploy-wanting",
    "page-type/secret",
    "page-type/service",
    "page-type/service-cluster",
    "page-type/service-inference",
    "page-type/service-workstation",
    "page-type/vendored-workload",
    "page-type/web-app",
    "service-workstation/cluster-deploying",
    "service-workstation/eso-addon-deploying",
    "service-workstation/service-watching",
    "service-workstation/web-app-deploying",
    "service-workstation/workstation-deploying",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The three services a runner keeps up sit in folders beside each other here.",
    },
  ],
} as const satisfies Domain
