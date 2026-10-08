import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const lokiService = {
  id: "01a06816-68b1-7121-a3e4-61d3cc74c4c8",
  type: "page-type/domain",
  slug: "loki-service",
  definition: "the manifests for the log store",
  parts: [
    "manifest/loki",
    "manifest/promtail",
    "module/loki-configs",
    "module/loki-constants",
    "module/loki-manifests",
    "module/promtail-manifests",
  ],
  createdAt: "2026-09-03T16:24:54.193Z",
  updatedAt: "2026-09-25T16:34:53.000Z",
} as const satisfies Domain
