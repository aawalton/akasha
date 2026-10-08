import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const telemetry = {
  id: "01a0658b-0f02-79eb-aed4-e7e8b92bc117",
  type: "page-type/domain",
  slug: "telemetry",
  definition: "how akasha keeps logs and metrics",
  parts: [
    "domain/log",
    "domain/metric",
    "manifest/dcgm-exporter-daemonset",
    "manifest/grafana",
    "manifest/kube-state-metrics",
    "manifest/node-exporter-daemonset",
    "manifest/prometheus",
    "module/prometheus-constants",
    "page-type/dashboard",
    "service-workstation/dcgm-exporter",
    "service-workstation/node-exporter",
  ],
  createdAt: "2026-09-03T04:33:27.298Z",
  updatedAt: "2026-09-25T17:18:14.000Z",
} as const satisfies Domain
