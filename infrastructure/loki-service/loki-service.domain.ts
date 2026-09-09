import type { Domain } from "../../domains/domain.page-type.ts"

export const lokiService = {
  id: "01a06816-68b1-7121-a3e4-61d3cc74c4c8",
  pageTypeSlug: "domain",
  slug: "loki-service",
  definition: "the manifests the cluster's log store and its collector are applied as",
  parts: [
    "manifest/loki",
    "manifest/promtail",
    "module/loki-constants",
    "module/loki-configs",
    "module/loki-manifests",
    "module/promtail-manifests",
  ],
} as const satisfies Domain
